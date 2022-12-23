import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { RouterModule } from '@angular/router';
import { AuthService } from '@finances-app/src/app/core/auth/auth.service';
import {JsonPipe, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'finances-app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [AngularMaterialModule, RouterModule, JsonPipe, NgClass, NgIf],
  standalone: true,
})
export class MainMenuComponent implements OnInit {
  dadosUsuario;
  menuOpened = false;
  isMobile = window.innerWidth < 768;

  constructor(private authService: AuthService) {
    this.authService.getDadosUsuario().subscribe((r) => {
      this.dadosUsuario = r;
      console.log(r)
    });
  }

  ngOnInit(): void {}

  openMenu() {
    this.menuOpened = !this.menuOpened;
  }
  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
