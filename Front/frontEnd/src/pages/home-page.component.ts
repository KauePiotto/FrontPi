import { Component, OnInit } from '@angular/core';

interface Produto {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isHighlight: boolean;
}

interface Feedback {
  id: number;
  avaliacao: number;
  comentario: string;
  data: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  produtos = {
    geladinhos: [
      { id: 1, name: 'Geladinho de Coco', description: 'Refrescante geladinho de coco natural', price: 2.50, image: '/assets/images/geladinho-coco.jpeg', isHighlight: true },
      { id: 2, name: 'Geladinho de Uva', description: 'Delicioso geladinho sabor uva', price: 2.50, image: '/assets/images/geladinho-uva.jpeg', isHighlight: false },
      { id: 3, name: 'Geladinho de Manga', description: 'Geladinho tropical de manga fresca', price: 2.50, image: '/assets/images/geladinho-manga.jpeg', isHighlight: true },
      { id: 4, name: 'Geladinho de Morango', description: 'Refrescante geladinho sabor morango', price: 2.50, image: '/assets/images/geladinho-morango.jpeg', isHighlight: true },
      { id: 5, name: 'Geladinho de Amendoim', description: 'Cremoso geladinho sabor amendoim', price: 3.00, image: '/assets/images/geladinho-amendoim.jpeg', isHighlight: true },
      { id: 6, name: 'Geladinho de Maracujá', description: 'Refrescante geladinho de maracujá', price: 2.50, image: '/assets/images/geladinho-maracuja.jpeg', isHighlight: false }
    ],
    picoles: [
      { id: 1, name: 'Picolé de Açaí', description: 'Picolé nutritivo de açaí com granola', price: 5.50, image: '/assets/images/picole-acai.jpeg', isHighlight: true },
      { id: 2, name: 'Picolé de Limão', description: 'Refrescante picolé de limão', price: 4.00, image: '/assets/images/picole-limao.jpeg', isHighlight: false },
      { id: 3, name: 'Picolé de Abacaxi', description: 'Picolé tropical de abacaxi', price: 4.50, image: '/assets/images/picole-abacaxi.jpeg', isHighlight: false },
      { id: 4, name: 'Picolé de Coco', description: 'Picolé cremoso de coco natural', price: 4.50, image: '/assets/images/picole-coco.jpeg', isHighlight: true },
      { id: 5, name: 'Picolé de Chocolate', description: 'Picolé cremoso coberto com chocolate', price: 5.00, image: '/assets/images/picole-chocolate.jpeg', isHighlight: true },
      { id: 6, name: 'Picolé de Manga', description: 'Picolé refrescante de manga', price: 4.50, image: '/assets/images/picole-manga.jpeg', isHighlight: false },
      { id: 7, name: 'Picolé de Maracujá', description: 'Picolé refrescante de maracujá', price: 4.50, image: '/assets/images/picole-maracuja.jpeg', isHighlight: false },
      { id: 8, name: 'Picolé de Morango', description: 'Picolé de morango natural', price: 4.50, image: '/assets/images/picole-morango.jpeg', isHighlight: true },
      { id: 9, name: 'Picolé de Leite Condensado', description: 'Picolé cremoso de leite condensado', price: 5.00, image: '/assets/images/picole-leite-condensado.jpeg', isHighlight: true }
    ]
  };

  activeTab: 'geladinhos' | 'picoles' = 'geladinhos';
  rating = 0;
  feedback = '';
  feedbackEnviado = false;

  constructor() { }

  ngOnInit(): void { }

  setTab(tab: 'geladinhos' | 'picoles') {
    this.activeTab = tab;
  }

  setRating(value: number) {
    this.rating = value;
  }

  submitFeedback() {
    if (this.rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }

    const novoFeedback: Feedback = {
      id: Date.now(),
      avaliacao: this.rating,
      comentario: this.feedback,
      data: new Date().toISOString()
    };

    const feedbacksSalvos: Feedback[] = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    localStorage.setItem('feedbacks', JSON.stringify([...feedbacksSalvos, novoFeedback]));

    this.rating = 0;
    this.feedback = '';
    this.feedbackEnviado = true;

    setTimeout(() => this.feedbackEnviado = false, 3000);
  }
}