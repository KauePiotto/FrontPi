import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Feedback {
  id: number;
  avaliacao: number;
  comentario: string;
  data: string;
}

@Component({
  selector: 'app-admin-feedbacks',
  templateUrl: './admin-feedbacks.component.html',
  styleUrls: ['./admin-feedbacks.component.css']
})
export class AdminFeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filtros = {
    avaliacao: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const feedbacksSalvos = localStorage.getItem('feedbacks');
    if (feedbacksSalvos) {
      this.feedbacks = JSON.parse(feedbacksSalvos);
    }
  }

  handleFiltroChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filtros.avaliacao = select.value;
  }

  handleDeletar(id: number) {
    this.feedbacks = this.feedbacks.filter(f => f.id !== id);
    localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
  }

  get feedbacksFiltrados(): Feedback[] {
    if (!this.filtros.avaliacao) {
      return this.feedbacks;
    }
    const aval = parseInt(this.filtros.avaliacao, 10);
    return this.feedbacks.filter(f => f.avaliacao === aval);
  }

  voltar() {
    this.router.navigate(['/']);
  }
}