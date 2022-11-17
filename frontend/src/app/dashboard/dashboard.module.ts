import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [DashboardComponent, FriendsComponent],
  imports: [SharedModule, HttpClientModule],
})
export class DashboardModule { }
