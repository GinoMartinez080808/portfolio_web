import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { TypewritersService } from '../../services/typewriters.service';
import { computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typewriter',
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.scss'
})
export class TypewriterComponent implements OnInit {
  typewriter = inject(TypewritersService);

  ngOnInit() {
    this.typewriter.start([
      'Bienvenido a mi portafolio',
      'Soy Gino Martínez',
      'Desarrollador Frontend', 
      'Tengo 17 años'
    ]);
  }
  }
