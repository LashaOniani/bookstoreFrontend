import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BookService } from '../book.service';
import { BookModel } from '../Models/BookModel';
import { OrdersModel } from '../Models/OrdersModel';
import { OrdersService } from '../orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: false,

  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',

})
export class BookListComponent {


  constructor(public bookService: BookService, public orderService: OrdersService, private route: Router) { }

  booksArray: any = []
  customer = ''
  orderdBooksArray: any[] = [];
  bookList: boolean = true
  
  orderTotal: number = 0

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.bookService.bookList = res
        this.booksArray = res
        // console.log(this.bookService.bookList)
      },
      error: (err) => console.error('Error:', err),
    });

  }

  handleCart($event: any) {
    this.orderdBooksArray.push({ ...$event, customer: this.customer })
    for (let i of this.orderdBooksArray) {
      this.orderTotal += $event.totalPrice
    }
  }

  save(): void {
    console.log(this.bookService.bookList)
  }


  displayCart() {
    if (this.orderdBooksArray.length && this.customer) {
      this.bookList = !this.bookList
    }
  }

  closeModal(): void {
    this.bookList = !this.bookList
    this.orderdBooksArray = []
    this.customer = ''
    this.orderTotal = 0
  }

  buy(): void {
    for (let i of this.orderdBooksArray) {
      let tempObj: OrdersModel = {
        bookId: i.bookId,
        quantity: i.quantity,
        customer: this.customer
      }
      this.orderService.addOrders(tempObj).subscribe();
      this.route.navigate([''])
      console.log(tempObj)
    }
  }

  routTo(param : string) : void {
    this.route.navigate([param]);
  }
}
