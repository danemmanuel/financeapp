import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'finances-app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [AngularMaterialModule, RouterModule],
  standalone: true,
})
export class MainMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
