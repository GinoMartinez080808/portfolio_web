import {
  Component,
  signal,
  WritableSignal,
  inject,
  runInInjectionContext,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Injector,
} from '@angular/core';
import { NgFor} from '@angular/common';
import { TypewriterComponent } from '../components/typewriter/typewriter.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TypewriterComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  name: string = 'Gino Martínez';
  email: string = 'ginomartinez690@gmail.com';
  phone: string = '+58 0412-2698503';
  address: string = 'Cabudare, Lara ,Venezuela';

  proyectos = [
    {
      nombre: 'Al Cambio',
      descripcion:
        'App para ver la tasa del día en BCV y Paralelo con Angular, Firebase y una versión usando Ionic.',
      tecnologias: ['Angular', 'Firebase', 'SCSS', 'Bootstrap', 'Ionic'],
      imagen: 'assets/todo-angular.png',
      enlaces: {
        demo: '',
        github: '',
      },
    },
    {
      nombre: 'Ejemplo de Tienda',
      descripcion:
        'Aplicación tipo e-commerce con Angular, Firebase y una versión usando Ionic.',
      tecnologias: ['Angular', 'Firebase', 'SCSS', 'Bootstrap', 'Ionic'],
      imagen: '',
      enlaces: {
        demo: '',
        github: '',
      },
    },
  ];

  @ViewChild('proyectosRef') proyectosRef!: ElementRef;
  scrollToProyectos() {
    this.proyectosRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  } 
  showScrollButton: WritableSignal<boolean> = signal(false);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  private injector = inject(Injector);

  ngAfterViewInit(): void {
    const el = this.scrollContainer?.nativeElement;
  
  
    if (!el) {
      console.warn('Scroll container no está disponible');
      return;
    }
  
    el.addEventListener('scroll', () => {
      const scrollTop = el.scrollTop;
      console.log('Scrolling. Top:', scrollTop);
  
      runInInjectionContext(this.injector, () => {
        this.showScrollButton.set(scrollTop > 300);
      });
    });
  }

  scrollToTop() {
    this.scrollContainer.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    console.log(this.scrollContainer.nativeElement.scrollTop);
  }

  showScrollButtonValue() {
    console.log(this.showScrollButton());
    return this.showScrollButton();
    
  }
}
  