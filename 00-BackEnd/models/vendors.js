export default class Agents {
    constructor(
        VendorId,
        VendorUserID,
        VendorGovtId,
        VendorCategory,
        VendorProductCount,
        VendorProductSellCounts,
        table
    ) {
        this.VendorId = vendor_id;
        this.VendorUserID = vendor_user_id;
        this.VendorGovtId = vendor_govt_id;
        this.VendorCategory = vendor_category;
        this.VendorProductCount = vendor_product_counts;
        this.VendorProductSellCounts = vendor_product_sell_counts
        this.table = "vendors";
    }

    display() {
        console.log(`Vendor User Id= ${this.VendorUserId}`);
        console.log(`Vendor Category= ${this.VendorCategory}`);
        console.log(`Vendor Category= ${this.VendorCategory}`);
        console.log(`Vendor Product Count= ${this.VendorProductCount}`);
        console.log(`Vendor Product Sell Count= ${this.VendorProductSellCounts}`);
    }
}
