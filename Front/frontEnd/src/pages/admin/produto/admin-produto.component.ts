import { Component } from '@angular/core';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  status: string;
}

@Component({
  selector: 'app-admin-produto',
  templateUrl: './admin-produto.component.html',
  styleUrls: ['./admin-produto.component.css']
})
export class AdminProdutoComponent {
  produtos: Produto[] = [
    { id: 1, nome: 'Geladinho de Morango', categoria: 'Geladinho', preco: 2.50, status: 'Ativo' },
    { id: 2, nome: 'Geladinho de Chocolate', categoria: 'Geladinho', preco: 2.50, status: 'Ativo' },
    { id: 3, nome: 'Picolé de Limão', categoria: 'Picolé', preco: 3.00, status: 'Ativo' },
  ];

  showModal = false;

  formData: Partial<Produto> = {
    nome: '',
    categoria: '',
    preco: undefined,
    status: 'Ativo'
  };

  handleSubmit() {
    // Aqui você pode implementar lógica para salvar no backend

    // Fechar modal após salvar
    this.showModal = false;
  }

  openModal() {
    this.formData = {
      nome: '',
      categoria: '',
      preco: undefined,
      status: 'Ativo'
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}