import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'finances-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'financesapp';
  autenticado: boolean;
  token = ``;
  constructor(private router: Router, private _authService: AuthService) {}
  async ngOnInit() {
    this.token = localStorage?.getItem('token');
    console.log(this.token);

  }
}
