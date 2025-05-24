import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-with-loading',
  templateUrl: './image-with-loading.component.html',
  styleUrls: ['./image-with-loading.component.css']
})
export class ImageWithLoadingComponent {
  @Input() src!: string;
  @Input() alt: string = '';
  @Input() className: string = '';

  isLoading: boolean = true;

  onLoad() {
    this.isLoading = false;
  }
}
