import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { SecurityRouter } from './security/security.router';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  { path: '', component:HomeComponent, canActivate: [SecurityRouter] },
  { path: 'recipients', component:RecipientsComponent },
  { path: 'transfer', component:TransferComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'history', component:TransferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityRouter]
})
export class AppRoutingModule { }
