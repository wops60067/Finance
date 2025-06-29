import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FinanceService } from './services/finance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoginVisible: boolean = false;

  title = 'FinanceProject';
  email:any;
  password:any;
  login() {
    this.service.Login(this.email, this.password).subscribe({
      next:(res) => {
        console.log(res);
        alert("登入成功！歡迎 "+res.name+'~');
        this.isLoginVisible = false;
      }
      , error:(err) => {
        console.log(err);
        alert("登入失敗");}
    });
  }
  constructor(private service:FinanceService) { }
}
