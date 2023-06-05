import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { loading } from 'src/app/shared/loading';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() isLogout: boolean = false;
  @Output() isLogoutChange = new EventEmitter<boolean>();
  public userData: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(String(sessionStorage.getItem('userData')));
  }

  ngOnDestroy(){
    console.log("destroying child...")
  }

  private loading = loading();
  async route(path: string) {
    await this.router.navigate([`/${path}`]);
  }

  async logout(){
    (await this.loading).present();
    await this.authService.logout();
    (await this.loading).dismiss();
    await this.router.navigate(['login']);
  }

}
