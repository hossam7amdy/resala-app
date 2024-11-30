import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AuthService } from './core/services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Resala';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    // This will trigger the session check to see if user is logged in or not. If user is not logged in,
    // it will call anonymous login to create a session for the user.
    this._authService.getSession().subscribe();
  }
}
