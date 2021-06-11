import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';
import { LoginComponent } from './security/login/login.component';
import { TransferComponent } from './transfer/transfer.component';
import { DestinataryComponent } from './destinatary/destinatary.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuComponent } from './navegation/menu/menu.component';
import { MenuListComponent } from './navegation/menu-list/menu-list.component';
import { TransferService } from './transfer/transfer.service';
import { DestinataryService } from './destinatary/destinatary.service';
import { RegisterComponent } from './security/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SecurityInterceptor } from './security/security-interceptor';
import { DestinataryNewComponent } from './destinatary/destinatary-new.component';
import { TransferenceComponent } from './transfer/transference.component';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    TransferComponent,
    DestinataryComponent,
    MenuComponent,
    MenuListComponent,
    RegisterComponent,
    DestinataryNewComponent,
    TransferenceComponent
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

  providers: [{provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true}, TransferService, DestinataryService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'} ],

  bootstrap: [AppComponent],
  entryComponents: [DestinataryNewComponent]
})
export class AppModule { }
