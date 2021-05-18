import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

//implement the OnDestroy lifecycle hook to unsubscribing of observable 
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';
    imageWidth: number = 150;
    imageMargin: number = 2;
    showImage: boolean = false;
    //to handle any errors, add an errorMessage property
    errorMesaage: string = '';
    //declare a variable for the subscription. The ! tells the TypeScript compiler that we'll handle the assingment of this property sometime later
    
    sub!: Subscription;
   
 // To set a List Filter
    //declare a private backing variable to hold the value   
    private _listFilter: string = '';
    errorMessage: any;
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
    products: IProduct[] = [];

    //we want to use our service to get products, so we define our product service as a dependency. We need a constructor and we use the shorhand syntax. The accessor doesn't have to be private. Now the Angular injector injects in the instance of the ProductService
    constructor(private productService: ProductService) {}

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
        //Option before subscribing. To call the service, use the lifecycle hook. It's a good place to retrieve the data for the template. Set the products property to the products returned from the service. Use a private variable containing the injected service instance with the name of the method we want to call.
        //this.products = this.productService.getProducts();

        //The productService.getProducts is changed in product.service.ts to return an observale. We can't assign the result of the product property directly. Rather we subscribe to the returned observable. To call the subscribe method, passing in an observer object, which provides functions for responding to our three notifications next, error, complete
        this.sub = this.productService.getProducts().subscribe({
            //for next notification we define an arrow function to specify what we want to do when the oservable emits the next value. When the array of products is returned in the response, we want to assign our local products variable to the returned array of products 
            next: products => {
                this.products = products;
               //let's set a filteredProducts property to our full list of products
                this.filteredProducts = this.products;
            },
            //error notification defines what to do if the observable emits an error. We assign our local errorMessage property to the provided error string
            error: err => this.errorMessage = err

        });
         
    }

    //define the OnDestrioy method that's required by lifecyclehook and use the subscribe variable to call unsunscribe.
    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    //method passing in the desired string. Display the product rating with this.rating
    onRatingClicked(message: string): void {
        //to display rating on the page title
        this.pageTitle = 'Product List: ' + message;
    }
}