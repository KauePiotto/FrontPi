import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBox, faIceCream, faComments, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  faBox = faBox;
  faIceCream = faIceCream;
  faComments = faComments;
  faSignOutAlt = faSignOutAlt;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      this.router.navigate(['/admin/login']);
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  handleLogout(): void {
    localStorage.removeItem('adminAuthenticated');
    this.router.navigate(['/admin/login']);
  }
}