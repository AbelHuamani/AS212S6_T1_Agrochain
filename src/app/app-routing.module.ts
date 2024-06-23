import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import { ProductoComponent } from './producto/producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { VistaComponent } from './vista/vista.component';
import { DepositComponent } from './deposit/deposit.component';

const routes: Routes = [
  { path: 'producto', component: ProductoComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'vista', component: VistaComponent },
  { path: 'Dapps', component: ConnectWalletComponent },
  { path: 'Transacion', component: DepositComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
