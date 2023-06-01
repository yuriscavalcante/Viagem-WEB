import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Input() isLogout: boolean = false;
  @Output() isLogoutChange = new EventEmitter<boolean>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  logout(){
    this.isLogoutChange.emit(true);
  }

  async route(path: string) {
    console.log(`/${path}`);
    // await this.router.navigate([path]);
  }

}
