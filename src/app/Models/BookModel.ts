export class BookModel {
    public id : number = 0
    public book_name : string = ''
    public author : string = ''
    public price : number = 0
    public quantity : number = 0
    constructor(
       id: number,
       book_name : string,
       author: string,
       price: number,
       quantity: number,
    ) {
        this.id = id
        this.author = author
        this.book_name = book_name
        this.price = price
        this.quantity = quantity
     } 
}