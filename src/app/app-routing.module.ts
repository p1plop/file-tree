import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FileTreeComponent} from './file-tree/file-tree.component';

const routes: Routes = [
  {
    path: '',
    component: FileTreeComponent,
    children: [
      { path: '**', component: FileTreeComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
