import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  saboresPorTipo: Record<string, string[]> = {
    Geladinho: ['Morango', 'Chocolate', 'Uva', 'Coco', 'Abacaxi'],
    Picolé: ['Limão', 'Morango', 'Chocolate', 'Coco', 'Abacaxi', 'Maracujá']
  };

  modalAberto = false;
  produtoEditando: Produto | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      sabor: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
      this.produtos = JSON.parse(produtosSalvos);
    } else {
      this.produtos = [
        { id: 101, tipo: 'Geladinho', sabor: 'Morango', descricao: 'Geladinho sabor morango', valor: 2.5 },
        { id: 102, tipo: 'Geladinho', sabor: 'Chocolate', descricao: 'Geladinho sabor chocolate', valor: 2.5 },
        { id: 201, tipo: 'Picolé', sabor: 'Limão', descricao: 'Picolé sabor limão', valor: 3.0 }
      ];
    }
  }

  // Salvar localStorage sempre que produtos mudarem
  private salvarLocalStorage() {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
  }

  // Aplicar filtros
  get produtosFiltrados(): Produto[] {
    return this.produtos.filter(p => {
      const filtroId = this.filtros.idProduto.trim();
      const filtroSabor = this.filtros.sabor.trim().toLowerCase();
      const filtroTipo = this.filtros.tipo.trim();

      let ok = true;
      if (filtroId && p.id.toString() !== filtroId) ok = false;
      if (filtroSabor && !p.sabor.toLowerCase().includes(filtroSabor)) ok = false;
      if (filtroTipo && p.tipo !== filtroTipo) ok = false;
      return ok;
    });
  }

  limparFiltros() {
    this.filtros = { idProduto: '', sabor: '', tipo: '' };
  }

  abrirModalParaAdicionar() {
    this.produtoEditando = null;
    this.form.reset();
    this.modalAberto = true;
  }

  abrirModalParaEditar(produto: Produto) {
    this.produtoEditando = produto;
    this.form.setValue({
      tipo: produto.tipo,
      sabor: produto.sabor,
      descricao: produto.descricao,
      valor: produto.valor
    });
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.produtoEditando = null;
    this.form.reset();
  }

  onTipoChange() {
    // Limpa sabor quando tipo muda
    this.form.patchValue({ sabor: '' });
  }

  deletar(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
    this.salvarLocalStorage();
  }

  salvar() {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const formValue = this.form.value;
    const novoValor = parseFloat(formValue.valor);

    if (novoValor <= 0) {
      alert('O valor deve ser maior que zero.');
      return;
    }

    if (this.produtoEditando) {
      // Editar
      this.produtos = this.produtos.map(p => {
        if (p.id === this.produtoEditando!.id) {
          return {
            ...p,
            tipo: formValue.tipo,
            sabor: formValue.sabor,
            descricao: formValue.descricao,
            valor: novoValor
          };
        }
        return p;
      });
    } else {
      // Adicionar
      const novoId = this.produtos.length > 0 ? Math.max(...this.produtos.map(p => p.id)) + 1 : 101;
      const novoProduto: Produto = {
        id: novoId,
        tipo: formValue.tipo,
        sabor: formValue.sabor,
        descricao: formValue.descricao,
        valor: novoValor
      };
      this.produtos = [...this.produtos, novoProduto];
    }

    this.salvarLocalStorage();
    this.fecharModal();
  }
}
