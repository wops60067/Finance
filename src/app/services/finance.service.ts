import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Member {
  id: number;
  email: string;
  password: string;
  name: string;
  create_time: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class FinanceService {
  private apiUrl = 'http://localhost:5156/api/Finance';
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/GetMembers`);
  }
  Login(email:string, password:string): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}/Login`, { email, password });
  }
  constructor(private http:HttpClient) { }
}
