import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {MatDatepickerModule} from '@angular/material/datepicker';

import {BrowserAnimationsModule} from 
    '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';

import {MatTableModule} from '@angular/material/table';

import {
  MatButtonModule,
} from '@angular/material/button';

import {MatNativeDateModule } from '@angular/material/core'; 

import {MatFormFieldModule} from '@angular/material/form-field'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendRequestsComponent } from './backend-requests/backend-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    BackendRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,        
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatNativeDateModule,
    ReactiveFormsModule      
  ],
  exports: [

      MatButtonModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatFormFieldModule,
      BrowserAnimationsModule,
      FormsModule,
      MatInputModule,
      MatTableModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
