import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  faStar = faStar;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;

  feedbacks: Feedback[] = [];
  filtros = {
    avaliacao: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const feedbacksSalvos = localStorage.getItem('feedbacks');
    this.feedbacks = feedbacksSalvos ? JSON.parse(feedbacksSalvos) : [];
  }

  handleFiltroChange(event: any): void {
    this.filtros.avaliacao = event.target.value;
  }

  handleDeletar(id: number): void {
    this.feedbacks = this.feedbacks.filter(f => f.id !== id);
    localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
  }

  get feedbacksFiltrados(): Feedback[] {
    if (this.filtros.avaliacao === '') {
      return this.feedbacks;
    }
    return this.feedbacks.filter(f => f.avaliacao === +this.filtros.avaliacao);
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
