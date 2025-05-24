// src/app/home-page/home-page.component.ts
import { Component, OnInit } from '@angular/core';

// Define produtos outside the component, similar to your React approach
// For a real app, this data would likely come from an API or a service.
const produtos = {
  geladinhos: [
    {
      id: 1,
      name: 'Geladinho de Coco',
      description: 'Refrescante geladinho de coco natural',
      price: 2.50,
      image: '/images/geladinho-coco.jpeg',
      isHighlight: true
    },
    {
      id: 2,
      name: 'Geladinho de Uva',
      description: 'Delicioso geladinho sabor uva',
      price: 2.50,
      image: '/images/geladinho-uva.jpeg',
      isHighlight: false
    },
    {
      id: 3,
      name: 'Geladinho de Manga',
      description: 'Geladinho tropical de manga fresca',
      price: 2.50,
      image: '/images/geladinho-manga.jpeg',
      isHighlight: true
    },
    {
      id: 4,
      name: 'Geladinho de Morango',
      description: 'Refrescante geladinho sabor morango',
      price: 2.50,
      image: '/images/geladinho-morango.jpeg',
      isHighlight: true
    },
    {
      id: 5,
      name: 'Geladinho de Amendoim',
      description: 'Cremoso geladinho sabor amendoim',
      price: 3.00,
      image: '/images/geladinho-amendoim.jpeg',
      isHighlight: true
    },
    {
      id: 6,
      name: 'Geladinho de Maracujá',
      description: 'Refrescante geladinho de maracujá',
      price: 2.50,
      image: '/images/geladinho-maracuja.jpeg',
      isHighlight: false
    }
  ],
  picoles: [
    {
      id: 1,
      name: 'Picolé de Açaí',
      description: 'Picolé nutritivo de açaí com granola',
      price: 5.50,
      image: '/images/picole-acai.jpeg',
      isHighlight: true
    },
    {
      id: 2,
      name: 'Picolé de Limão',
      description: 'Refrescante picolé de limão',
      price: 4.00,
      image: '/images/picole-limao.jpeg',
      isHighlight: false
    },
    {
      id: 3,
      name: 'Picolé de Abacaxi',
      description: 'Picolé tropical de abacaxi',
      price: 4.50,
      image: '/images/picole-abacaxi.jpeg',
      isHighlight: false
    },
    {
      id: 4,
      name: 'Picolé de Coco',
      description: 'Picolé cremoso de coco natural',
      price: 4.50,
      image: '/images/picole-coco.jpeg',
      isHighlight: true
    },
    {
      id: 5,
      name: 'Picolé de Chocolate',
      description: 'Picolé cremoso coberto com chocolate',
      price: 5.00,
      image: '/images/picole-chocolate.jpeg',
      isHighlight: true
    },
    {
      id: 6,
      name: 'Picolé de Manga',
      description: 'Picolé refrescante de manga',
      price: 4.50,
      image: '/images/picole-manga.jpeg',
      isHighlight: false
    },
    {
      id: 7,
      name: 'Picolé de Maracujá',
      description: 'Picolé refrescante de maracujá',
      price: 4.50,
      image: '/images/picole-maracuja.jpeg',
      isHighlight: false
    },
    {
      id: 8,
      name: 'Picolé de Morango',
      description: 'Picolé de morango natural',
      price: 4.50,
      image: '/images/picole-morango.jpeg',
      isHighlight: true
    },
    {
      id: 9,
      name: 'Picolé de Leite Condensado',
      description: 'Picolé cremoso de leite condensado',
      price: 5.00,
      image: '/images/picole-leite-condensado.jpeg',
      isHighlight: true
    }
  ]
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] // Or use Tailwind CSS in your project setup
})
export class HomePageComponent implements OnInit {
  activeTab: 'geladinhos' | 'picoles' = 'geladinhos';
  rating: number = 0;
  feedback: string = '';
  feedbackEnviado: boolean = false;
  produtosData = produtos; // Make the products available to the template

  constructor() { }

  ngOnInit(): void {
    // You can perform initialization logic here if needed
  }

  setActiveTab(tab: 'geladinhos' | 'picoles'): void {
    this.activeTab = tab;
  }

  setRating(newRating: number): void {
    this.rating = newRating;
  }

  handleSubmitFeedback(): void {
    if (this.rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }

    const novoFeedback = {
      id: Date.now(),
      avaliacao: this.rating,
      comentario: this.feedback,
      data: new Date().toISOString()
    };

    // Save feedback to localStorage
    const feedbacksSalvos = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    localStorage.setItem('feedbacks', JSON.stringify([...feedbacksSalvos, novoFeedback]));

    // Clear the form
    this.rating = 0;
    this.feedback = '';
    this.feedbackEnviado = true;

    // Reset feedback sent state after 3 seconds
    setTimeout(() => {
      this.feedbackEnviado = false;
    }, 3000);
  }

  // Helper to scroll to section
  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}