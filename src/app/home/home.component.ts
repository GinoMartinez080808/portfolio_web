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
  OnDestroy,
  OnInit,
  DestroyRef,
  effect,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';



import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass} from '@angular/common';
import { TypewriterComponent } from '../components/typewriter/typewriter.component';



@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [TypewriterComponent, NgFor,NgClass, NgIf,FormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit {
  name: string = 'Gino Martínez';
  email: string = 'ginomartinez690@gmail.com';
  phone: string = '+58 0412-2698503';
  address: string = 'Cabudare, Lara ,Venezuela';


  images = [
    'https://picsum.photos/id/1018/1000/600/',
    'https://picsum.photos/id/1015/1000/600/',
    'https://picsum.photos/id/1019/1000/600/'
  ];
 
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

  // Señales
  showScrollButton: WritableSignal<boolean> = signal(false);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  private injector = inject(Injector);

  ngAfterViewInit(): void {
    const el = this.scrollContainer.nativeElement;
    // Agregar el evento de scroll al contenedor
    el.addEventListener('scroll', () => {
      const scrollTop = el.scrollTop;
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
    
  }

  showScrollButtonValue() {
 

    return this.showScrollButton();
  }
  isVisible = true;

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isVisible = window.innerWidth > 1198; 
  }


  formData = {
    name: '',
    email: '',
    message: ''
  }
   loading = false;
  openModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('contactModal')!);
    modal.show();
  }

  closeModal() {
    const modalEl = document.getElementById('contactModal');
    const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();
  }

  onSubmit() {
    this.loading = true; 

    const serviceID = 'service_aasdasdasdas';
    const templateID = "template_b4gjzee";
    const publicKey = 'aOEllL7YXBQ_t3GZT';

    emailjs.send(serviceID, templateID, this.formData, publicKey)
      .then(() => {
     //   alert('Correo enviado con éxito');
     Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Gracias por contactarme. Te responderé pronto.',
      icon: 'success',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      iconColor: '#00c9a7',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#00c9a7',
      backdrop: `
        rgba(0, 0, 0, 0.4)
        blur(10px)
      `,
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-swal-button'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
    
        this.resetForm();
      })
      .catch((err) => {
       // alert('Error al enviar el correo: ' + err.text);
       Swal.fire({
        title: 'Error al enviar',
        text: 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.',
        icon: 'error',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        iconColor: '#ff4d4f',
        confirmButtonText: 'Reintentar' ,
        confirmButtonColor: '#ff4d4f',
        backdrop: `
          rgba(0, 0, 0, 0.4)
          blur(10px)
        `,
        customClass: {
          popup: 'custom-swal-popup',
          confirmButton: 'custom-swal-button'
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // 👇 Abres el modal si el usuario acepta
          this.openModal();
        }});
      
        this.loading = false;
      });
  
    this.closeModal();
    this.formData = { name: '', email: '', message: '' };
  }
  resetForm() {
    this.loading = false;
    this.closeModal();
    this.formData = { name: '', email: '', message: '' };
  }
  
}


  