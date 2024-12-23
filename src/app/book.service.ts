import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookModel } from './Models/BookModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:5052/api/"

  private books : BookModel[] = []

  getBooks(): Observable<BookModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get<BookModel[]>(`${this.baseUrl}Book/GetAllBook`, httpOptions)
      .pipe();
  }

  addBook(book : BookModel) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<BookModel[]>(`${this.baseUrl}Book/SaveBoook`, book, httpOptions)
      .pipe(
        // catchError((error) => {
        //   console.error('შეიქმნა პრობლემა წიგნის დამატების დროს:', error);
        //   return throwError(error);
        // })
      );
  }

  updateBook(book : BookModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .put<BookModel[]>(`${this.baseUrl}Book/UpdateBook`, book, httpOptions)
      .pipe();
  }

  get bookList(): BookModel[] {
    return this.books;
  }
  
  set bookList(list: BookModel[]) {
    this.books = list;
  }

}
