import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
//for the exception handling
import { catchError, tap } from "rxjs/operators";
import { IProduct } from "./product";

//add the provideIn property to the Injectable decorator and set it to root. An instance of the ProductService is then available for injection anywhere in the application
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    //to identify the URL of the web server use to send the HTTP requests. We define a private property for that purpose. To change the write the server-side code to return the list of products. 
    private productUrl = 'api/products/products.json';


    //to modify ProductService to get the product data using HTTP we want Angular to provide us an instance of the HttpClient service, so we identify it as a dependency in the constructor. Angular injects the HttpClient service instance into this variable
    constructor(private http: HttpClient) {}
    //for ProductService we want a getProducts method that returns the list of products. Strongly typed this return value using our IProduct interface
    getProducts(): Observable<IProduct[]> {
        //instead the hard-code we call the http.get method, passing in the defined URL, with generic parameter to IProduct array. We call the observable's pipe method to specify a set of operators.
        //we can add other methods here to post or put data as well  
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            //tap (to access the emitted item without modifying it; takes in an arrow function with the parameter - is the emitted data, defines we want to do with that data - console.log. We use JSON.stringify, a JS method that converts an objects/array of objects to a JSON string for makes it easier to display in the console)
            tap(data => console.log('All', JSON.stringify(data))),
            //and catchError, which takes in a named function/method. We paste in the handleError method 
            catchError(this.handleError)
        );
    }
    //to handle logging errors any way we want
    private handleError(err: HttpErrorResponse) {
        // in a real world app, wee may send the server to some remote loggin infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occured. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        } 
        //we just log to the console, and throw an error to the calling code
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}