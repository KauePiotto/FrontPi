import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '../components/admin-layout/admin-layout.component';
import { AdminLoginComponent } from '../pages/admin/login/admin-login.component';
import { AdminProdutosComponent } from '../pages/admin/produto/admin-produtos.component';
import { AdminEstoqueComponent } from '../pages/admin/estoque/admin-estoque.component';
import { AdminFeedbacksComponent } from '../pages/admin/feedback/admin-feedbacks.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'produtos',
        component: AdminProdutosComponent
      },
      {
        path: 'estoque',
        component: AdminEstoqueComponent
      },
      {
        path: 'feedbacks',
        component: AdminFeedbacksComponent
      },
      {
        path: '',
        redirectTo: 'produtos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'admin/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
