export default class Customers {
    constructor(
        CustomerId,
        CustomerUserId,
        CustomerOrderCounts,
        CustomerTotalExpenses,
        table
    ) {
        this.CustomerId = customer_id;
        this.CustomerUserId = customer_user_id;
        this.CustomerOrderCounts = customer_order_counts;
        this.CustomerTotalExpenses = customer_total_expenses;
        this.table = "customers";
    }

    display() {
        console.log(`User Id= ${this.CustomerUserId}`);
        console.log(`Total Orders= ${this.CustomerOrderCounts}`);
        console.log(`Total Expenses= ${this.CustomerTotalExpenses}`);
    }
}