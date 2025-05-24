import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent {
  @Input() rating: number = 0;
  @Input() disabled: boolean = false;

  @Output() ratingChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  setRating(star: number) {
    if (!this.disabled) {
      this.rating = star;
      this.ratingChange.emit(this.rating);
    }
  }
}
