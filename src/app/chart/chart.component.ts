import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart',
  imports: [
    FormsModule
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  selectedSymbol: string = 'OANDA:XAUUSD';
  customSymbol: string = '';

  ngAfterViewInit(): void {
    this.loadTradingViewScript();
  }

  loadTradingViewScript(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.onload = () => {
      this.initTradingViewWidget(this.selectedSymbol);
    }
    document.body.appendChild(script);
    
    this.loadTradingHeapmaps();
  }
  
  initTradingViewWidget(symbol: string): void {
    const container = document.getElementById('tradingview_12345');
    if (container) container.innerHTML = ''; // 清除原本的圖表

    new (window as any).TradingView.widget({
      autosize: true,
      symbol: symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'zh',
      container_id: 'tradingview_12345'
    });
  }
  loadTradingHeapmaps(): void {
    const container = document.getElementById('heapmap-widget-container');
    if (!container) return;
  
    container.innerHTML = '';
  
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.type = 'text/javascript';
    script.async = true;
  
    script.innerHTML = `
    {
      "exchanges": [],
      "dataSource": "SPX500",
      "grouping": "sector",
      "blockSize": "market_cap_basic",
      "blockColor": "change",
      "locale": "en",
      "symbolUrl": "",
      "colorTheme": "dark",
      "hasTopBar": false,
      "isDataSetEnabled": false,
      "isZoomEnabled": true,
      "hasSymbolTooltip": true,
      "isMonoSize": false,
      "width": "100%",
      "height": "100%"
    }`;
  
    container.appendChild(script);
  }
  // 點選下拉選單或輸入後套用新標的
  updateChart(): void {
    const symbolToUse = this.customSymbol.trim() !== '' ? this.customSymbol : this.selectedSymbol;
    this.initTradingViewWidget(symbolToUse);
  }

  onSelectChange(): void {
    // 當選單變動時，清空自訂輸入
    if (this.selectedSymbol) {
      this.customSymbol = '';
    }
  }
  
  onInputChange(): void {
    // 當輸入變動時，清空選單選項
    if (this.customSymbol.trim() !== '') {
      this.selectedSymbol = '';
    }
  }
}
