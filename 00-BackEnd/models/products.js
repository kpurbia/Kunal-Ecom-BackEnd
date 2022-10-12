export default class Products {
    constructor() {
        this.ProductId = ProductId;
        this.ProductVendorID = ProductVendorID;
        this.ProductName = ProductName;
        this.ProductCategory = ProductCategory;
        this.ProductPrice = ProductPrice;
        this.ProductDescription = ProductDescription;
        this.ProductQuantity = ProductQuantity;
        this.ProductSellCount = ProductSellCount;
        this.table = "products";
    }

    display() {
        console.log(`Product Name= ${this.ProductName}`);
        console.log(`Product Category= ${this.ProductCategory}`);
        console.log(`Product Price= ${this.ProductPrice}`);
        console.log(`Product Description= ${this.ProductDescription}`);
    }
}
