import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { PresencePage } from './presence.page';

const routes: Routes = [
  { path: '', component: PresencePage }
];

@NgModule({
  declarations: [PresencePage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class PresencePageModule {}
