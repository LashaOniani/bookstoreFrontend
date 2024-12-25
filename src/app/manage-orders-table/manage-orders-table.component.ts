import { Component, Input } from '@angular/core';
import { OrdersModel } from '../Models/OrdersModel';
import { OrdersService } from '../orders.service';

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

  constructor(private orderService : OrdersService){
  }

  openOrder(customer : any, order_date : any) : void {
    
    if(this.orderdProducts.length === 0){
      let tempObj : OrdersModel = {}
      this.orderService.get_opened_order({...tempObj, customer: customer, order_date: order_date}).subscribe(res =>{
        // console.log(res)
        this.orderdProducts = res
        })
    }

    this.openTableOfOrders = !this.openTableOfOrders
  }


  changeOrderStatus(statusNumber : number){
    let tempObj = {...this.eachOrder, order_status: statusNumber}
    // console.log(tempObj)
    this.orderService.update_order_status(tempObj).subscribe(() => {

    })
  }

}
