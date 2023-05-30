import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { loading } from 'src/app/shared/loading';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading = loading();
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async logout(event: any){
    (await this.loading).present();
    await this.authService.logout();
    (await this.loading).dismiss();
    await this.router.navigate(['login']);
  }

}
