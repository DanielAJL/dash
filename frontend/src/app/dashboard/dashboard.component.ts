import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../DTO/UserDTO';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!: UserDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
