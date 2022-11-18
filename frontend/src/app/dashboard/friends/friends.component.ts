import { Component, Input, OnInit } from '@angular/core';
import { FriendRequestDTO } from 'src/app/DTO/FriendRequestDTO';
import { UserDTO } from 'src/app/DTO/UserDTO';

// class userAndRequestDataInOne {
//   user: UserDTO;
//   friends: FriendRequestDTO;
// };


@Component({
  selector: 'friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit {

  constructor() { }
  @Input() friends: UserDTO[]; // decorate the property with @Input()

  ngOnInit(): void {

  }

}
