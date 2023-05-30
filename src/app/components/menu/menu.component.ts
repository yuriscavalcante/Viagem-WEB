import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Input() isLogout: boolean = false;
  @Output() isLogoutChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  logout(){
    this.isLogoutChange.emit(true);
  }

}
