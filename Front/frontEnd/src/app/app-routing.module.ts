import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from '../pages/home-page.component';
import { AdminLoginComponent } from '../pages/admin/login/admin-login.component';
import { AdminLayoutComponent } from '../components/admin-layout/admin-layout.component';
import { AdminEstoqueComponent } from '../pages/admin/estoque/admin-estoque.component';
import { AdminProdutosComponent } from '../pages/admin/produto/admin-produtos.component';
import { AdminFeedbacksComponent } from '../pages/admin/feedback/admin-feedbacks.component';

import { AdminAuthGuard } from '../pages/admin/guard/admin-auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'admin/login', component: AdminLoginComponent },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'estoque', pathMatch: 'full' },
      { path: 'estoque', component: AdminEstoqueComponent },
      { path: 'produtos', component: AdminProdutosComponent },
      { path: 'feedbacks', component: AdminFeedbacksComponent },
    ],
  },

  { path: '**', redirectTo: '' }, // fallback para homepage ou 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}