import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'finances-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.login();
  }

  login() {
    //window.open(`https://api.minhasfinancas.digital/auth`, '_self');
  }
}
