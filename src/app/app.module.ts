import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FolderComponent } from './file-tree/folder/folder.component';

@NgModule({
  declarations: [
    AppComponent,
    FileTreeComponent,
    FolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
