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

  setRating(star: number): void {
    if (!this.disabled) {
      this.ratingChange.emit(star);
    }
  }
}