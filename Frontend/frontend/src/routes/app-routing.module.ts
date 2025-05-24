import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '../components/admin-layout.component';
import { AdminLoginComponent } from '../pages/admin/AdminLogin.component';
import { AdminProdutosComponent } from'../pages/admin/AdminProdutos.component';
import { AdminProdutoComponent } from '../pages/admin/AdminProduto.component';
import { AdminEstoqueComponent } from '../pages/admin/AdminEstoque.component';
import { AdminFeedbacksComponent } from '../pages/admin/AdminFeedbacks.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'produtos', component: AdminProdutosComponent },
      { path: 'estoque', component: AdminEstoqueComponent },
      { path: 'feedbacks', component: AdminFeedbacksComponent },
      { path: 'produto', component: AdminProdutoComponent }
    ]
  },
  
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
