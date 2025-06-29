import { Component } from '@angular/core';
import { FinanceService } from '../services/finance.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-other',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.css'
})
export class OtherComponent {
  constructor(private service:FinanceService){}
  data: any;
  test() {
    this.service.getMembers().subscribe(res => {
      this.data = res;
      console.log('data', this.data);
    });
  }
}
