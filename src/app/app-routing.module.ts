import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'presence',
    loadChildren: () =>
      import('./pages/presence/presence.module').then(m => m.PresencePageModule)
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/reports/reports.module').then(m => m.ReportsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
