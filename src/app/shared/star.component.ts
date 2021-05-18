import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component ({
    selector: 'ff-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

//if the user clicks on the stars, we want to emit an event to notify the container. Any time the container data changes, the OnChanges lifecycle event is generated, the cropWidth is recalculated, and the appropriate stars are dispayed
export class StarComponent implements OnChanges {
     //The StarComponent wants its container to pass in the rating, we add the @Input decorator to any property we want passed in
    @Input() rating: number = 0;
    cropWidth: number = 75;
    //define a new ratingClicked event property in the nested component. To pass a string to the container as part of event, specify string as the generic argument <>
    @Output() ratingClicked: EventEmitter<string> = 
        //set the ratingClicked property to a new instance of EventEmitter. 
        new EventEmitter<string>();

    ngOnChanges(): void {
        //set the cropWidth property  in the ngOnChanges method, when the OnChanges lifecycle event occurs, which whatches for changes to input properties. 
        this.cropWidth = this.rating * 75/5; 
        //Don't forget to bind the nested components input property in the container's template using property binding
    }
    
    //write the onClick method in the component, it's has no return type, so specify void
    onClick(): void {
        //emit ratingClicked event and pass the message to the container component every time the user clicks on the stars. We use the event property and call its emit method passing in the desired string. Display the product rating with this.rating
       this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
    }
}