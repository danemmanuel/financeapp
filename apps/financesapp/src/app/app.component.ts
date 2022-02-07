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
  usuario: any;
  constructor(private router: Router, private _authService: AuthService) {
    this._authService.currentUser.subscribe((r) => {
      this.usuario = r;
    });
  }
  async ngOnInit() {
    setTimeout(async () => {
       this._authService.exemplo().subscribe(r=>{
        console.log(r);

      })
    }, 3000);
  }
}
