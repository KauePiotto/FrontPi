import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Produto {
  id: number;
  nome: string;
}

interface Estoque {
  id: number;
  produtoId: number;
  nomeProduto: string;
  quantidade: number | '';
  minimo: number | '';
  dataAtualizacao: string;
}

@Component({
  selector: 'app-admin-estoque',
  templateUrl: './admin-estoque.component.html',
  styleUrls: ['./admin-estoque.component.css']
})
export class AdminEstoqueComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  mockProdutos: Produto[] = [
    { id: 101, nome: 'Geladinho de Morango' },
    { id: 102, nome: 'Geladinho de Chocolate' },
    { id: 103, nome: 'Geladinho de Coco' },
    { id: 104, nome: 'Geladinho de Uva' },
    { id: 105, nome: 'Geladinho de Abacaxi' },
    { id: 201, nome: 'Picolé de Limão' },
    { id: 202, nome: 'Picolé de Maracujá' },
    { id: 203, nome: 'Picolé de Morango' },
    { id: 204, nome: 'Picolé de Chocolate' },
    { id: 205, nome: 'Picolé de Coco' },
    { id: 206, nome: 'Picolé de Uva' },
    { id: 207, nome: 'Picolé de Abacaxi' },
    { id: 208, nome: 'Picolé de Manga' },
    { id: 209, nome: 'Picolé de Graviola' },
    { id: 210, nome: 'Picolé de Acerola' },
    { id: 211, nome: 'Picolé de Cupuaçu' },
    { id: 212, nome: 'Picolé de Açaí' },
    { id: 213, nome: 'Picolé de Tangerina' },
    { id: 214, nome: 'Picolé de Goiaba' },
    { id: 215, nome: 'Picolé de Cajá' },
    { id: 216, nome: 'Picolé de Caju' },
    { id: 217, nome: 'Picolé de Pitanga' },
    { id: 218, nome: 'Picolé de Jabuticaba' },
    { id: 219, nome: 'Picolé de Tamarindo' },
    { id: 220, nome: 'Picolé de Carambola' }
  ];

  mockEstoques: Estoque[] = [
    { id: 1, produtoId: 101, nomeProduto: 'Geladinho de Morango', quantidade: 50, minimo: 10, dataAtualizacao: '2024-03-20' },
    { id: 2, produtoId: 102, nomeProduto: 'Geladinho de Chocolate', quantidade: 30, minimo: 5, dataAtualizacao: '2024-03-19' },
  ];

  estoques: Estoque[] = [];
  filtros = {
    idEstoque: '',
    produtoId: '',
    data: ''
  };

  modalAberto = false;
  estoqueEditando: Estoque | null = null;

  formData: Estoque = {
    id: 0,
    produtoId: 0,
    nomeProduto: '',
    quantidade: '',
    minimo: '',
    dataAtualizacao: ''
  };

  ngOnInit() {
    const estoquesSalvos = localStorage.getItem('estoques');
    this.estoques = estoquesSalvos ? JSON.parse(estoquesSalvos) : this.mockEstoques;
  }

  salvarLocalStorage() {
    localStorage.setItem('estoques', JSON.stringify(this.estoques));
  }

  handleFiltroChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    (this.filtros as any)[name] = value;
  }

  get estoquesFiltrados(): Estoque[] {
    return this.estoques.filter(e => {
      const matchId = this.filtros.idEstoque ? e.id.toString().includes(this.filtros.idEstoque) : true;
      const matchProduto = this.filtros.produtoId ? e.produtoId.toString() === this.filtros.produtoId : true;
      const matchData = this.filtros.data ? e.dataAtualizacao === this.filtros.data : true;
      return matchId && matchProduto && matchData;
    });
  }

  abrirModalAdicionar() {
    this.estoqueEditando = null;
    this.formData = {
      id: 0,
      produtoId: 0,
      nomeProduto: '',
      quantidade: '',
      minimo: '',
      dataAtualizacao: ''
    };
    this.modalAberto = true;
  }

  handleFormChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (name === 'produtoId') {
      const produtoSelecionado = this.mockProdutos.find(p => p.id === +value);
      this.formData.produtoId = +value;
      this.formData.nomeProduto = produtoSelecionado ? produtoSelecionado.nome : '';
    } else if (name === 'quantidade' || name === 'minimo') {
      this.formData[name] = value ? +value : '';
    } else {
      (this.formData as any)[name] = value;
    }
  }

  editarEstoque(estoque: Estoque) {
    this.estoqueEditando = estoque;
    this.formData = { ...estoque };
    this.modalAberto = true;
  }

  deletarEstoque(id: number) {
    this.estoques = this.estoques.filter(e => e.id !== id);
    this.salvarLocalStorage();
  }

  salvarEstoque() {
    // Validações
    if (!this.formData.quantidade || this.formData.quantidade <= 0) {
      alert('A quantidade deve ser maior que zero');
      return;
    }

    if (!this.formData.minimo || this.formData.minimo <= 0) {
      alert('A quantidade mínima deve ser maior que zero');
      return;
    }

    if (this.formData.quantidade < this.formData.minimo) {
      alert('A quantidade não pode ser menor que a quantidade mínima');
      return;
    }

    const dataAtualizacao = new Date(this.formData.dataAtualizacao);
    const hoje = new Date();
    if (dataAtualizacao > hoje) {
      alert('A data de atualização não pode ser futura');
      return;
    }

    if (this.estoqueEditando) {
      this.estoques = this.estoques.map(e => e.id === this.estoqueEditando!.id ? { ...this.formData, id: this.estoqueEditando!.id } : e);
    } else {
      const novoId = this.estoques.length > 0 ? Math.max(...this.estoques.map(e => e.id)) + 1 : 1;
      this.estoques = [...this.estoques, { ...this.formData, id: novoId }];
    }

    this.salvarLocalStorage();
    this.modalAberto = false;
    this.estoqueEditando = null;
  }

  cancelar() {
    this.modalAberto = false;
    this.estoqueEditando = null;
  }
}
