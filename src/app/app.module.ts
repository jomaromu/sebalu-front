import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { PrincipalComponent } from './paginas/pages/principal.component';
import { FooterComponent } from './shared/footer/footer.component';

import { CorreoService } from './servicios/correo.service';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CorreoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
