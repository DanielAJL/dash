// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RegisterAndLoginModule } from './register-and-login/register-and-login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { UsersModule } from './users/users.module';

// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    RegisterAndLoginModule,
    DashboardModule,
    UsersModule,
    DialogsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
