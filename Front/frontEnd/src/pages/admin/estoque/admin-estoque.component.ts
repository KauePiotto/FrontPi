import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Produto {
  id: number;
  nome: string;
}

interface Estoque {
  id: number;
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  minimo: number;
  dataAtualizacao: string; // ISO string
}

@Component({
  selector: 'app-admin-estoque',
  templateUrl: './admin-estoque.component.html',
  styleUrls: ['./admin-estoque.component.css']
})
export class AdminEstoqueComponent implements OnInit {
  produtos: Produto[] = [
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

  estoques: Estoque[] = [];

  filtros = {
    idEstoque: '',
    produtoId: '',
    data: ''
  };

  modalAberto = false;
  estoqueEditando: Estoque | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Carregar do localStorage ou usar mock
    const estoquesSalvos = localStorage.getItem('estoques');
    this.estoques = estoquesSalvos ? JSON.parse(estoquesSalvos) : [
      { id: 1, produtoId: 101, nomeProduto: 'Geladinho de Morango', quantidade: 50, minimo: 10, dataAtualizacao: '2024-03-20' },
      { id: 2, produtoId: 102, nomeProduto: 'Geladinho de Chocolate', quantidade: 30, minimo: 5, dataAtualizacao: '2024-03-19' }
    ];

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      produtoId: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]],
      minimo: ['', [Validators.required, Validators.min(1)]],
      dataAtualizacao: ['', Validators.required]
    });
  }

  abrirModal(estoque?: Estoque) {
    this.estoqueEditando = estoque || null;
    if (estoque) {
      this.form.setValue({
        produtoId: estoque.produtoId,
        quantidade: estoque.quantidade,
        minimo: estoque.minimo,
        dataAtualizacao: estoque.dataAtualizacao
      });
    } else {
      this.form.reset();
    }
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.estoqueEditando = null;
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const produtoId = +this.form.value.produtoId;
    const nomeProduto = this.produtos.find(p => p.id === produtoId)?.nome || '';
    const quantidade = +this.form.value.quantidade;
    const minimo = +this.form.value.minimo;
    const dataAtualizacao = this.form.value.dataAtualizacao;

    // Validações extras
    if (quantidade < minimo) {
      alert('A quantidade não pode ser menor que a quantidade mínima');
      return;
    }

    const dataAtual = new Date();
    const dataForm = new Date(dataAtualizacao);
    if (dataForm > dataAtual) {
      alert('A data de atualização não pode ser futura');
      return;
    }

    if (this.estoqueEditando) {
      // Editar
      this.estoques = this.estoques.map(e =>
        e.id === this.estoqueEditando!.id
          ? { ...e, produtoId, nomeProduto, quantidade, minimo, dataAtualizacao }
          : e
      );
    } else {
      // Adicionar novo
      const novoId = this.estoques.length > 0 ? Math.max(...this.estoques.map(e => e.id)) + 1 : 1;
      this.estoques.push({ id: novoId, produtoId, nomeProduto, quantidade, minimo, dataAtualizacao });
    }

    localStorage.setItem('estoques', JSON.stringify(this.estoques));
    this.fecharModal();
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja deletar este estoque?')) {
      this.estoques = this.estoques.filter(e => e.id !== id);
      localStorage.setItem('estoques', JSON.stringify(this.estoques));
    }
  }

  // Filtros aplicados na visualização da tabela
  get estoquesFiltrados() {
    return this.estoques.filter(e => {
      const filtroId = this.filtros.idEstoque ? e.id.toString().includes(this.filtros.idEstoque) : true;
      const filtroProduto = this.filtros.produtoId ? e.produtoId === +this.filtros.produtoId : true;
      const filtroData = this.filtros.data ? e.dataAtualizacao === this.filtros.data : true;
      return filtroId && filtroProduto && filtroData;
    });
  }

  // Para atualizar os filtros
  setFiltro(campo: string, valor: string) {
    (this.filtros as any)[campo] = valor;
  }
}