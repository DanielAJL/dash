import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../DTO/UserDTO';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!: UserDTO;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.getUserObs().subscribe(user => {
      this.user = user;
      console.log(user);

    });
  }

}
