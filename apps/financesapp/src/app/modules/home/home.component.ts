import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'finances-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  login() {
    window.open(`http://api.minhasfinancas.digital/auth`, '_self');
  }
}
