import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 150;
    imageMargin: number = 2;
    showImage: boolean = false;
  
 // To set a List Filter
    //declare a private backing variable to hold the value   
    private _listFilter: string = '';
    //define the getter
    get listFilter(): string {
        //the body includes code to process the property value before returning it
        return this._listFilter;
    }
    //define the setter. It has a single parameter, the value assigned to the property. The setter has no return value
    set listFilter(value: string) {
        //to perform an operation when the property is changed we set the value into the private backing variable
        console.log('In sett', value);
        //set a property to filtered list of products and defined a method to filter our products, which added down here by the other methods
        this.filteredProducts = this.performFilter(value);
    }

    //define a property to get a filtered list of products that we can bind to
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [
        { 
            "productId": 2,
            "productName": "Снегурочка Снежинка",
            "productCode": "SNSx-01",
            "sale": "10 %",
            "dateSale": "31.12.2021",
            "description": "Атласная белая ткань с металлическим отливом, круппные узоры, застежки на липучках. В комплекте шубка, варежки, шапочка.",
            "price": "2610",
            "starRating": 4.2,
            "imageUrl": "assets/images/sn-s-01.png"
        },
        {
            "productId": 5,
            "productName": "Дед Мороз Боярский Синий",
            "productCode": "DMBS-01",
            "sale": "",
            "dateSale": "",
            "description": "Бархатная мягкая синяя ткань с длинношерстным мехом, блестящими крупными узорами и вшитыми бусинами. В комплекте шуба, варежки, шапка, пояс, мешок.",
            "price": "6900",
            "starRating": 4.8,
            "imageUrl": "assets/images/dm-bs-01.png"
        }

    ];

    //method takes in the one parameter, which is string and returns the filtered array of products
    performFilter(filterBy: string): IProduct[] {
        //the code starts by converting the filter criteria to lowercase for a case-insencitive comparsion
        filterBy = filterBy.toLocaleLowerCase();
        //return the filtered list of products: we start with the original full list of products, an array, we use the JS arrow method "filter", we pass into the filter method an arrow function that processes each passed-in product. In the body of the arrow function we check the productName
        return this.products.filter((product: IProduct) => 
        //we call the string includes method, passing in the filter string, which returns true if the productName includes the defined filter string
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = '';
    }
}