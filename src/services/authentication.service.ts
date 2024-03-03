import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from 'src/interfaces/user';
import { firstValueFrom } from 'rxjs';
import { RegisteredUser } from '../interfaces/registeredUser';
import { NgForm } from '@angular/forms';
import { LoginSchema } from 'src/schemas/LoginSchema';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpService: HttpService) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    console.log('set token: ', token);
    localStorage.setItem('token', token);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  async register(form: any): Promise<RegisteredUser | null> {
    console.log(form);
    let response = await firstValueFrom(
      this.httpService.post<RegisteredUser>('user/register', form.value)
    );
    console.log(response);
    if (!!response.userName) {
      console.log(response);
      return response;
    }

    return null;
  }

  async login(userObject: LoginSchema): Promise<User> {
    let response = await firstValueFrom(
      this.httpService.post<User>('user/login', userObject)
    );
    if (!!response.token) {
      this.clearLocalStorage();
      this.setToken(response.token);
      this.setUsername(response.user.userName);
      console.log(response.user.userName);
      return response;
    }

    this.clearLocalStorage();
    console.log('Login denied');
    throw new Error('Wrong username or password');
  }

  logout(): void {
    this.clearLocalStorage();
  }

  vertifyUser(): boolean {
    const token = this.getToken();
    return token !== null;
  }
}
