import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      this.router.navigate(['/admin/login']);
    }

    // Captura rota ativa para aplicar estilo
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  isActiveRoute(path: string): boolean {
    return this.currentRoute === path;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('adminAuthenticated');
    this.router.navigate(['/admin/login']);
  }
}
