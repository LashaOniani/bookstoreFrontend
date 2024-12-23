import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrdersModel } from './Models/OrdersModel';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:5052/api/"

  getOrders(): Observable<OrdersModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get<OrdersModel[]>(`${this.baseUrl}Orders/get_orders`, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error fetching books:', error);
          return throwError(error);
        })
      );
  }

  addOrders(order : any) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(`${this.baseUrl}Orders/AddOrder`, order, httpOptions)
      .pipe();
  }
}
