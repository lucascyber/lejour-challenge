import { Component, OnInit } from '@angular/core';
import { CardRadiusOptions } from './shared/components/card/card.enum';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lejour-dashboard';

  constructor(private userService: UsersService) {

  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
    });
  }
}
