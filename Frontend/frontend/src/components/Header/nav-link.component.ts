import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.css']
})
export class NavLinkComponent {
  @Input() href: string = '#';
  @Output() linkClick = new EventEmitter<Event>();
}
