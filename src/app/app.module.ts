import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { VistaComponent } from './vista/vista.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DepositComponent } from './deposit/deposit.component'; // Importa NgbModule

@NgModule({
  declarations: [
    AppComponent,
    ConnectWalletComponent,
    InicioComponent,
    ProductoComponent,
    VistaComponent,
    DepositComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    //se añade para el enrutamiento
    ReactiveFormsModule,  //se añade para el enrutamiento
    FormsModule,          //se añade para form del html de metamask
    NgbModule,            // Añade NgbModule aquí para el carrusel
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
