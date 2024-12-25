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
      // catchError((error) => {
      //   console.error('Error fetching books:', error);
      //   return throwError(error);
      // })
    );
  }

  addOrders(order: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<any>(`${this.baseUrl}Orders/AddOrder`, order, httpOptions)
      .pipe();

  }

  get_user_s_orders(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<OrdersModel[]>(`${this.baseUrl}Orders/Get_User_s_Orders`, httpOptions);
  }


  get_user_orders(customer: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<OrdersModel[]>(`${this.baseUrl}Orders/Get_User_Orders?customer=${encodeURIComponent(customer)}`, httpOptions);
  }


  get_opened_order(order: OrdersModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<OrdersModel>(`${this.baseUrl}Orders/Get_user_each_order`, order, httpOptions);
  }

  update_order_status(order: OrdersModel): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<OrdersModel>(`${this.baseUrl}Orders/Update_Order_status`, order, httpOptions);

  }
}
