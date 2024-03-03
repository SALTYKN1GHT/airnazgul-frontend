import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/interfaces/user';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public loginVisible: boolean = false;
  public registerVisible: boolean = false;

  public userName: string = '';
  public loggedIn: boolean = false;

  faShoppingCart = faShoppingCart;
  constructor(private authService: AuthenticationService) {}
  ngOnInit(): void {
    this.userName = this.authService.getUsername() || '';
    this.loggedIn = this.validateAccessToken();
  }

  showRegister(event: boolean) {
    this.registerVisible = event;
  }

  showLogin(event: boolean) {
    this.loginVisible = event;
    console.log('This.loginvisible in showlogin:', this.loginVisible);
  }

  receiveUserLoginEvent(userObj: User['user']) {
    this.userName = userObj.userName;
    this.loginVisible = false;
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
    this.userName = '';
    this.authService.logout();
  }
  validateAccessToken(): boolean {
    const token = window.localStorage.getItem('token');
    return !!token;
  }
}
