import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RsiCrossComponent } from "../rsi-cross/rsi-cross.component";

@Component({
  selector: 'app-strategy-main',
  imports: [RsiCrossComponent,CommonModule],
  templateUrl: './strategy-main.component.html',
  styleUrl: './strategy-main.component.css'
})
export class StrategyMainComponent {
  selectedStrategy: string | null = null;
  onRSIStrategySelected(strategy: any) {
    this.selectedStrategy = strategy;
  }
}
