import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import * as utils from '../../utils/util-functions';
import { User } from 'src/interfaces/user';
import { HttpService } from 'src/services/http.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationService } from 'src/services/authentication.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { LoginSchema, loginSchema } from 'src/schemas/LoginSchema';
import { ValidationError, fromZodError } from 'zod-validation-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewChecked, OnDestroy {
  @Input() loginVisible: boolean | undefined = undefined;
  @Output() onRegister = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<boolean>();

  @Output() userLoginEvent = new EventEmitter<User['user']>();

  public userObject: User | null | undefined = undefined;
  public formData = { username: '', email: '', password: '' };
  public defUserInputClass: boolean = true;
  public defEmailInputClass: boolean = true;
  public passValidateStatus: boolean;
  public passValidateMsgVisible: boolean = false;
  public passValidateMsg: string = '';
  public defPassInputClass: boolean = true;

  public showPassword: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService
  ) {}
  ngOnDestroy(): void {}
  ngAfterViewChecked(): void {}
  ngAfterViewInit(): void {}
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  togglePassword(event: MouseEvent) {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    console.log(passwordField);
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

  async onSubmit(form: NgForm) {
    let parseData: Record<string, unknown> = {};
    let errMsg: string = '';
    try {
      parseData = loginSchema.parse(form.value);
      this.userObject = await this.authService.login(parseData as LoginSchema);
      setTimeout(() => {
        this.userLoginEvent.emit(this.userObject?.user);
        this.closeModal();
        form.reset();
      }, 1000);
    } catch (error: any) {
      this.userObject = null;
      if (
        !!error &&
        typeof error === 'object' &&
        (Object.hasOwn(error, 'issues') || Object.hasOwn(error, 'details')) &&
        Object.hasOwn(error, 'name')
      ) {
        this.passValidateMsg = fromZodError(error).toString();
        return;
      }
      this.passValidateMsg = error.message;
    }
    // console.log('ParseData:', parseData);
    // console.log('Error message:', errMsg);
  }

  closeModal() {
    this.onClose.emit(false);
    console.log('Closemodal called: ', this.loginVisible);
  }
  showRegister() {
    this.onClose.emit(false);
    this.onRegister.emit(true);
  }
  // async onRegister(form: any) {
  //   const registerResult = await this.authService.register(form);

  //   if (!!registerResult) {
  //     this.isRegisteredSuccessful = true;
  //   }

  //   setTimeout(() => {
  //     this.closeModal();
  //     this.isRegisteredSuccessful = false;
  //     form.reset();
  //   }, 4000);
  // }
}
