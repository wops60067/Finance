// app.routes.ts
import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ChartComponent } from './chart/chart.component';
import { RsiCrossComponent } from './strategy/rsi-cross/rsi-cross.component';
import { StrategyMainComponent } from './strategy/strategy-main/strategy-main.component';
import { OtherComponent } from './other/other.component';

export const routes: Routes = [
  { path: 'about-me', component: AboutMeComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'rsi', component: RsiCrossComponent },
  { path: 'strategy-main', component: StrategyMainComponent },
  { path: 'other', component: OtherComponent },
];
