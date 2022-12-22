import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { RouterModule } from '@angular/router';
import { AuthService } from '@finances-app/src/app/core/auth/auth.service';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'finances-app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [AngularMaterialModule, RouterModule, JsonPipe],
  standalone: true,
})
export class MainMenuComponent implements OnInit {
  dadosUsuario;

  constructor(private authService: AuthService) {
    this.authService.getDadosUsuario().subscribe((r) => {
      this.dadosUsuario = r;
      console.log(r)
    });
  }

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
