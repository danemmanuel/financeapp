import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-conta/formulario-conta.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'finances-app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.jwt);
      if (!params.jwt) return;
      localStorage.setItem('token', JSON.stringify(params.jwt));
      this.router.navigate(['dashboard/home'])
    });
  }
}
