import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'finances-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['dashboard/home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
