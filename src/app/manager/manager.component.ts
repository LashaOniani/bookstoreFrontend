import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { BookModel } from '../Models/BookModel';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OrdersService } from '../orders.service';
import { OrdersModel } from '../Models/OrdersModel';

import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  standalone: false,
  
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  saveBook : FormGroup; //ფორმა

  books: BookModel[] = [];
  selectedBooks: BookModel[] = [];

  userOrders : OrdersModel[]= []

  loading: boolean = true;
  visible: boolean = false;
  
  searchValue: string = '';

  quantityToDisplay : number = 0

  constructor(private bookService: BookService, private fb: FormBuilder, private orderservice : OrdersService, private router : Router) {
    this.saveBook = this.fb.group({
      author: ['', [Validators.required]],
      book_name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: [ 0, [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
      this.loading = false;
    });
    // this.orderservice.getOrders().subscribe(res => {
    //   console.log(res)
    //   this.userOrders = res
    // })
    this.orderservice.get_user_s_orders().subscribe((res) => {
      console.log(res)
      this.userOrders = res
    })
  }

  clearFilters(dt: any) {
    this.searchValue = '';
    dt.clear();
  }

  showDialog() {
      this.visible = true;
  }

  addBook() : void {

    let tempObj : BookModel = {
      id: this.books[this.books.length - 1].id + 1,
      ...this.saveBook.value
    }

    this.bookService.addBook(tempObj).subscribe(() => {
      this.books.push(tempObj);
      this.visible = false;
    })
  }


  incrementQuantity(): void {
    const currentQuantity = this.saveBook.get('quantity')?.value || 0;
    this.saveBook.get('quantity')?.setValue(currentQuantity + 1);
  }

  decrementQuantity(): void {
    const currentQuantity = this.saveBook.get('quantity')?.value || 0; 
    if (currentQuantity > 0) {
      this.saveBook.get('quantity')?.setValue(currentQuantity - 1);
    }
  }

  clearForm(){
    this.saveBook.reset();
  }

  editBookName(book: any): void {
    book.isEditing = true; 
  }

  //აფდეითი მუშაობს თეიბლის გარეთ დაკლიკებაზე - გატესტილია
  updateBook(book: any): void {
    book.isEditing = false;
    this.bookService.updateBook(book).subscribe();
    console.log('Saved book name:', book);
  }
  
  deleteBook(bookId : any) : void {
    // this.books = []
    this.bookService.delete_book(bookId).subscribe(() => {
      this.bookService.getBooks().subscribe(res => this.books = res)
    });
  }


  routTo(param : string) : void {
    this.router.navigate([param]);
  }
  
}