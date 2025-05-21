import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Produto {
  id: number;
  tipo: string;
  sabor: string;
  descricao: string;
  valor: number;
}

@Component({
  selector: 'app-admin-produtos',
  templateUrl: './admin-produtos.component.html',
  styleUrls: ['./admin-produtos.component.css']
})
export class AdminProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  filtros = {
    idProduto: '',
    sabor: '',
    tipo: ''
  };

  modalAberto = false;
  produtoEditando: Produto | null = null;

  formData = {
    tipo: '',
    sabor: '',
    descricao: '',
    valor: ''
  };

  saboresPorTipo: { [key: string]: string[] } = {
    Geladinho: ['Morango', 'Chocolate', 'Uva', 'Coco', 'Abacaxi'],
    Picolé: ['Limão', 'Morango', 'Chocolate', 'Coco', 'Abacaxi', 'Maracujá']
  };

  mockProdutos: Produto[] = [
    { id: 101, tipo: 'Geladinho', sabor: 'Morango', descricao: 'Geladinho sabor morango', valor: 2.50 },
    { id: 102, tipo: 'Geladinho', sabor: 'Chocolate', descricao: 'Geladinho sabor chocolate', valor: 2.50 },
    { id: 201, tipo: 'Picolé', sabor: 'Limão', descricao: 'Picolé sabor limão', valor: 3.00 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const produtosSalvos = localStorage.getItem('produtos');
    this.produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [...this.mockProdutos];
  }

  salvarLocalStorage() {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
  }

  aplicarFiltros(): Produto[] {
    return this.produtos.filter(p => {
      const filtroIdOk = this.filtros.idProduto ? p.id.toString().includes(this.filtros.idProduto) : true;
      const filtroSaborOk = this.filtros.sabor ? p.sabor.toLowerCase().includes(this.filtros.sabor.toLowerCase()) : true;
      const filtroTipoOk = this.filtros.tipo ? p.tipo === this.filtros.tipo : true;
      return filtroIdOk && filtroSaborOk && filtroTipoOk;
    });
  }

  abrirModalParaAdicionar() {
    this.produtoEditando = null;
    this.formData = { tipo: '', sabor: '', descricao: '', valor: '' };
    this.modalAberto = true;
  }

  abrirModalParaEditar(produto: Produto) {
    this.produtoEditando = produto;
    this.formData = {
      tipo: produto.tipo,
      sabor: produto.sabor,
      descricao: produto.descricao,
      valor: produto.valor.toString()
    };
    this.modalAberto = true;
  }

  cancelar() {
    this.modalAberto = false;
    this.produtoEditando = null;
    this.formData = { tipo: '', sabor: '', descricao: '', valor: '' };
  }

  salvar() {
    // Validações
    const valorNum = parseFloat(this.formData.valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      alert('O valor deve ser maior que zero');
      return;
    }

    if (this.produtoEditando) {
      // Editar
      this.produtos = this.produtos.map(p =>
        p.id === this.produtoEditando!.id
          ? { ...p, tipo: this.formData.tipo, sabor: this.formData.sabor, descricao: this.formData.descricao, valor: valorNum }
          : p
      );
    } else {
      // Adicionar novo
      const novoId = this.produtos.length > 0 ? Math.max(...this.produtos.map(p => p.id)) + 1 : 101;
      const novoProduto: Produto = {
        id: novoId,
        tipo: this.formData.tipo,
        sabor: this.formData.sabor,
        descricao: this.formData.descricao,
        valor: valorNum
      };
      this.produtos.push(novoProduto);
    }

    this.salvarLocalStorage();
    this.cancelar();
  }

  deletar(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
    this.salvarLocalStorage();
  }

  onTipoChange() {
    // Limpa sabor ao mudar tipo
    this.formData.sabor = '';
  }

  voltarPaginaInicial() {
    this.router.navigate(['/']);
  }
}