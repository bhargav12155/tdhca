import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { ApplicationComponent } from './components/pages/application/application';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'dashboard', component: Dashboard },
  // Placeholder routes for future implementation
  { path: 'application', component: ApplicationComponent },
  { path: 'profile', redirectTo: 'home', pathMatch: 'full' },
  { path: 'settings', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
