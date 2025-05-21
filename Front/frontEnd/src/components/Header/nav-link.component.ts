import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.css']
})
export class NavLinkComponent {
  @Input() href: string = '';
  @Input() label: string = '';
  @Input() onClick?: () => void;

  handleClick(event: Event): void {
    if (this.onClick) {
      event.preventDefault();
      this.onClick();
    }
  }
}
