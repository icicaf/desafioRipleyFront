import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario.component';

import { FormsModule } from '@angular/forms';
import { RecipientsComponent } from './recipients/recipients.component';
import { RecipientComponent } from './recipient/recipient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RecipientsService } from './services/recipients.service';
import { HomeComponent } from './home.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './security/login/login.component';
import { TransferComponent } from './transfer/transfer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuComponent } from './navegation/menu/menu.component';
import { MenuListComponent } from './navegation/menu-list/menu-list.component';
import { SecurityService } from './security/security.service';
import { TransferService } from './transfer/transfer.service';
import { RegisterComponent } from './security/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipientNewComponent } from './recipients/recipient-new.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    RecipientsComponent,
    RecipientComponent,
    HomeComponent,
    LoginComponent,
    TransferComponent,
    MenuComponent,
    MenuListComponent,
    RegisterComponent,
    RecipientNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [RecipientsService, TransferService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'} ],
  bootstrap: [AppComponent],
  entryComponents: [RecipientNewComponent]
})
export class AppModule { }
