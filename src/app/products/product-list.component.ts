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
    listFilter: string = 'снегурочка';
    products: IProduct[] = [
        { 
            "productId": 2,
            "productName": "Снегурочка Снежинка",
            "productCode": "SN-S-01",
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
            "productCode": "DM-BS-01",
            "sale": "",
            "dateSale": "",
            "description": "Бархатная мягкая синяя ткань с длинношерстным мехом, блестящими крупными узорами и вшитыми бусинами. В комплекте шуба, варежки, шапка, пояс, мешок.",
            "price": "6900",
            "starRating": 4.8,
            "imageUrl": "assets/images/dm-bs-01.png"
        }

    ];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log("In OnInit");
    }
}