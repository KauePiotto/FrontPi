import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../pages/HomePage.component';
import { AdminLoginComponent } from '../pages/admin/AdminLogin.component';
import { AdminLayoutComponent } from '../components/admin-layout.component';
import { AdminEstoqueComponent } from '../pages/admin/AdminEstoque.component';
import { AdminProdutosComponent } from '../pages/admin/AdminProdutos.component';
import { AdminFeedbacksComponent } from '../pages/admin/AdminFeedbacks.component';
import { AuthGuard } from './guards/auth.guard';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'estoque', pathMatch: 'full' },
      { path: 'estoque', component: AdminEstoqueComponent },
      { path: 'produtos', component: AdminProdutosComponent },
      { path: 'feedbacks', component: AdminFeedbacksComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
