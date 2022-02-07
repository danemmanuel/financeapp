import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.jwt);
      this._authService.currentUserSubject.next({ token: params.jwt });
    });
  }
}
