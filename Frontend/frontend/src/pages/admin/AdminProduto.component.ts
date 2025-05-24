import { Component } from '@angular/core';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  status: 'Ativo' | 'Inativo';
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

  formData: Produto = {
    id: 0,
    nome: '',
    categoria: '',
    preco: 0,
    status: 'Ativo'
  };

  private nextId = 4;

  abrirModal() {
    this.formData = {
      id: 0,
      nome: '',
      categoria: '',
      preco: 0,
      status: 'Ativo'
    };
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
  }

  salvarProduto() {
    if (!this.formData.nome || !this.formData.categoria || this.formData.preco <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (this.formData.id === 0) {
      // Novo produto
      this.formData.id = this.nextId++;
      this.produtos.push({...this.formData});
    } else {
      // Editar produto existente
      const index = this.produtos.findIndex(p => p.id === this.formData.id);
      if (index !== -1) {
        this.produtos[index] = {...this.formData};
      }
    }

    this.fecharModal();
  }

  editarProduto(produto: Produto) {
    this.formData = {...produto};
    this.showModal = true;
  }

  deletarProduto(id: number) {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtos = this.produtos.filter(p => p.id !== id);
    }
  }
}
