import { Component } from '@angular/core';
import { TypewriterComponent } from '../components/typewriter/typewriter.component';
@Component({
  selector: 'app-home',
  imports: [TypewriterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  name:string = 'Gino Martínez';
  email:string = 'ginomartinez690@gmail.com';
  phone:string = '+58 0412-2698503';
  address:string = 'Cabudare, Lara ,Venezuela';
  
  
  
}

