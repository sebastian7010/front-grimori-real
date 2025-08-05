
  import { Routes } from '@angular/router';

  export const routes: Routes = [
    
    {
        path: '',
        loadComponent: () =>
          import('./components/articles-list/articles-list.component').then(m => m.ArticlesListComponent)
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./components/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
      },
      {
        path: 'admin/dashboard',
        loadComponent: () =>
          import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      }

  ];  