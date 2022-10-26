// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegisterAndLoginModule } from './register-and-login/register-and-login.module';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { RegisterComponent } from './register-and-login/register/register.component';
// import { LoginComponent } from './register-and-login/login/login.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RegisterAndLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
