import { Component, Input } from '@angular/core';
import { OrdersModel } from '../Models/OrdersModel';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-manager-user-orders',
  standalone: false,
  
  templateUrl: './manager-user-orders.component.html',
  styleUrl: './manager-user-orders.component.css'
})
export class ManagerUserOrdersComponent {

  @Input() eachUserOrders !: OrdersModel
  displayUserAllOrders : boolean = false;
  searchUserOrdersRes : OrdersModel[] = []

  constructor(private orderService : OrdersService){}

  searchUserOrders(customer : any) : void {
    if(this.searchUserOrdersRes.length === 0){
      this.orderService.get_user_orders(customer).subscribe(res => {
        console.log(res)
        this.displayUserAllOrders = true
        this.searchUserOrdersRes = res
      })
    }else{
      
      this.displayUserAllOrders = !this.displayUserAllOrders
    }
  }


  openOrder(customer : any, order_date : any) : void {
    let tempObj : OrdersModel = {}
    this.orderService.get_opened_order({...tempObj, customer: customer, order_date: order_date}).subscribe(res => console.log)
  }
}
