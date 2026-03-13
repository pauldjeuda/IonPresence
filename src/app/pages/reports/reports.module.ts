import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReportsPage } from './reports.page';

const routes: Routes = [
  { path: '', component: ReportsPage }
];

@NgModule({
  declarations: [ReportsPage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsPageModule {}
