import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  formData = {
    email: '',
    senha: ''
  };

  erro = '';

  constructor(private router: Router) {}

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    this.formData = { ...this.formData, [name]: value };
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this.formData.email === 'admin@geladinho.com' && this.formData.senha === 'admin123') {
      localStorage.setItem('adminAuthenticated', 'true');
      this.router.navigate(['/admin/produtos']);
    } else {
      this.erro = 'Email ou senha incorretos';
    }
  }

  voltar() {
    this.router.navigate(['/']);
  }
}