import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Trade {
  entryIndex: number;
  exitIndex: number;
  direction: 'long' | 'short';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
}

@Component({
  selector: 'app-rsi-cross',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './rsi-cross.component.html',
  styleUrl: './rsi-cross.component.css'
})
export class RsiCrossComponent {
  constructor(private https: HttpClient) { }
  //get price from API
  data:any[]=[];
  // getPrice(){
  //   const url = 'https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers?page=1&type=STOCKS';
  //   const headers = new HttpHeaders({
  //     'x-rapidapi-key': 'e73511bf3cmsh445def16f7ce375p1a341ajsndefc3d543192',
  //     'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
  //   });
  //   this.https.get(url, { headers }).subscribe({
  //     next:(res) =>{
  //       console.log('取得資料',res);
  //       this.data = res as any[]
  //     },
  //     error:(err) => {
  //       console.log('取得資料失敗',err);
  //     }
  //   })
  // }
  getPrice() {
    const symbol = 'TSLA';
    const interval = '1h'; // 可改成 5min, 15min, 1h, 1day 等
    const outputsize = 20;  // 最多取多少筆資料
    const apikey = '093894aef9964ed9a04ecdb99146858b';
  
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${apikey}`;
  
    this.https.get(url).subscribe({
      next: (res: any) => {
        console.log('歷史價格資料:', res);
        this.data = res.values.map((item:any) => parseFloat(item.close))
        console.log('歷史價格資料:', this.data);
      },
      error: (err) => {
        console.error('取得歷史資料失敗:', err);
      }
    });
  }
  
  

  rsiPeriod = 14;
  overbought = 70;
  oversold = 30;

  trades: Trade[] = [];
  stats: { totalTrades: number; winRate: number; totalPnl: number } | null = null;
  startCapital = 10000; // 起始資金，預設 1 萬
  endCapital: number | null = null;
  returnRate: number | null = null;
  backtest() {
    this.getPrice();
    this.trades = this.runRSIBacktest(this.data, this.rsiPeriod, this.overbought, this.oversold);
    this.stats = this.getBacktestStats(this.trades);
    const totalPnl = this.stats?.totalPnl ?? 0;
    this.endCapital = this.startCapital + totalPnl;
    this.returnRate = this.startCapital ? Number(((totalPnl / this.startCapital) * 100).toFixed(2)) : 0;
  }

  calculateRSI(closes: number[], period = 14): number[] {
    const rsi: number[] = [];
    let gains = 0;
    let losses = 0;
    //計算總漲幅和總跌幅
    for (let i = 1; i <= period; i++) {
      const change = closes[i] - closes[i - 1];
      if (change >= 0) gains += change;
      else losses -= change;
    }
    //計算平均漲幅和平均跌幅
    gains /= period;
    losses /= period;
    //計算RSI
    rsi[period] = 100 - (100 / (1 + gains / losses));
    //計算平滑RSI
    for (let i = period + 1; i < closes.length; i++) {
      const change = closes[i] - closes[i - 1];
      const gain = Math.max(0, change);
      const loss = Math.max(0, -change);

      gains = (gains * (period - 1) + gain) / period;
      losses = (losses * (period - 1) + loss) / period;

      rsi[i] = 100 - (100 / (1 + gains / losses));
    }

    return rsi;
  }

  runRSIBacktest(closes: number[], rsiPeriod = 14, overbought = 70, oversold = 30): Trade[] {
    const rsi = this.calculateRSI(closes, rsiPeriod);
    const trades: Trade[] = [];

    let position: null | {
      direction: 'long' | 'short';
      entryIndex: number;
      entryPrice: number;
    } = null;

    for (let i = rsiPeriod + 1; i < closes.length; i++) {
      const price = closes[i];
      const r = rsi[i];

      if (!position) {
        if (r < oversold) {
          position = { direction: 'long', entryIndex: i, entryPrice: price };
        } else if (r > overbought) {
          position = { direction: 'short', entryIndex: i, entryPrice: price };
        }
      } else {
        if ((position.direction === 'long' && r > 50) ||
            (position.direction === 'short' && r < 50)) {
          const pnl = position.direction === 'long'
            ? price - position.entryPrice
            : position.entryPrice - price;

          trades.push({
            entryIndex: position.entryIndex,
            exitIndex: i,
            direction: position.direction,
            entryPrice: position.entryPrice,
            exitPrice: price,
            pnl: Number(pnl.toFixed(2)),
          });

          position = null;
        }
      }
    }

    return trades;
  }

  getBacktestStats(trades: Trade[]) {
    const totalTrades = trades.length;
    const winTrades = trades.filter(t => t.pnl > 0).length;
    const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);

    return {
      totalTrades,
      winRate: totalTrades ? Math.round((winTrades / totalTrades) * 100) : 0,
      totalPnl: Number(totalPnl.toFixed(2)),
    };
  }
}
