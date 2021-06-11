import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { SecurityRouter } from './security/security.router';
import { TransferComponent } from './transfer/transfer.component';
import { transferenceComponent } from './transfer/transference.component';
import { DestinataryComponent } from './destinatary/destinatary.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent },
  { path: 'transfers', component:TransferComponent },
  { path: 'transference', component:transferenceComponent },
  { path: 'recipients', component:DestinataryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityRouter]
})
export class AppRoutingModule { }
