import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../Models/BookModel';
import { ButtonModule } from 'primeng/button';
import { OrdersModel } from '../Models/OrdersModel';


@Component({
  selector: 'app-book',
  standalone: false,
  
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  @Input() book !: BookModel
  @Input() customer : string = ''
  @Output() handleCart = new EventEmitter<any>();

  quantityNumber : number = 0;

  plusOne() : void {
    if(this.quantityNumber < this.book.quantity){
      this.quantityNumber++
    }
  }

  minusOne() : void {
    if(this.quantityNumber > 0){
      this.quantityNumber--
    }
  }

  addToCart(quantity : number){
    let tempObj = {
      id: 0,
      bookId: this.book.id,
      book_name: this.book.book_name,
      quantity: quantity,
      price : this.book.price,
      author : this.book.author,
      totalPrice : this.book.price * quantity
    }
    this.handleCart.emit(tempObj)
  }
}
