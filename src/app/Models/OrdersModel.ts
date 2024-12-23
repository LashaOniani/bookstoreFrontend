export class OrdersModel 
{    constructor(
        public id  ?: number,
        public bookId ?: number,
        public quantity ?: number,
        public order_date  ?: Date,
        public book_name ?: string,
        public customer ?: string,
        public order_total ?: string,
    )
    {
        
    }
}