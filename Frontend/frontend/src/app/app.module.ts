import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from '../components/Header/header.component';
import { HomePageComponent } from '../pages/HomePage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
