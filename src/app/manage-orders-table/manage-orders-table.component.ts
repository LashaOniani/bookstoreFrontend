import { Component, Input } from '@angular/core';
import { OrdersModel } from '../Models/OrdersModel';
import { OrdersService } from '../orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders-table',
  standalone: false,
  
  templateUrl: './manage-orders-table.component.html',
  styleUrl: './manage-orders-table.component.css'
})
export class ManageOrdersTableComponent {
  @Input() eachOrder : OrdersModel = {}
  openTableOfOrders : boolean = false;
  orderdProducts : OrdersModel[] = []
  totalPrice : number = 0;

  constructor(private orderService : OrdersService, private router : Router){
  }

  openOrder(customer : any, order_date : any) : void {
    
    if(this.orderdProducts.length === 0){
      let tempObj : OrdersModel = {}
      this.orderService.get_opened_order({...tempObj, customer: customer, order_date: order_date}).subscribe(res =>{
        // console.log(res)
        this.orderdProducts = res
        for(let eachOrderedBook of res){
          this.totalPrice += eachOrderedBook.order_total
        }
        })
    }

    this.openTableOfOrders = !this.openTableOfOrders
  }


  changeOrderStatus(statusNumber : number){
    let tempObj = {...this.eachOrder, order_status: statusNumber}
    // console.log(tempObj)
    this.orderService.update_order_status(tempObj).subscribe(() => {
      window.location.reload();
    })
  }

}
