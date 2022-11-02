import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users.component';
import { SingleUserComponent } from './single-user/single-user.component';

@NgModule({
  declarations: [UsersComponent, SingleUserComponent],
  imports: [SharedModule, HttpClientModule],
})
export class UsersModule { }
