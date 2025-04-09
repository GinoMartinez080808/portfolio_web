import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'typewriter', component: TypewriterComponent },
];
 