import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  RegisterSchema,
  passErrorSchema,
  passwordSchema,
  registerSchema,
} from 'src/schemas/RegisterSchema';
import { fromZodError } from 'zod-validation-error';
import * as utils from '../../utils/util-functions';
import { ZodError, ZodIssue } from 'zod';
import { Form, NgForm } from '@angular/forms';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Input() registerVisible: boolean | undefined = undefined;
  @Output() onBackToLogin = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<boolean>();
  @ViewChild('password') password: ElementRef<HTMLInputElement> | undefined =
    undefined;
  @ViewChild('confirmPassword') confirmPassword:
    | ElementRef<HTMLInputElement>
    | undefined = undefined;

  public userData: RegisterSchema = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  public isValidPassword: boolean = true;
  public passwordRequirements: string[] = [];
  public errorMsgs: Record<string, string[]> = {};
  public passErrorFields: string[] = Object.values(passErrorSchema);
  constructor(private httpService: HttpService) {}

  onSubmit() {
    try {
      const parseData = registerSchema.parse(this.userData);
      this.httpService
        .post('user/register', {
          username: parseData.username,
          email: parseData.email,
          password: parseData.password,
        })
        .subscribe((result) => {
          console.log(result);
        });
    } catch (error: any) {
      if (
        !!error &&
        typeof error === 'object' &&
        (Object.hasOwn(error, 'issues') || Object.hasOwn(error, 'details')) &&
        Object.hasOwn(error, 'name')
      ) {
        this.errorMsgs = this.parseError(error);
        // this.isValidPassword = false;
        // this.passErrorFields = Array.from(new Set(err.split('; ')));
        // this.passwordRequirements = this.passwordRequirements.filter(
        //   (item) => !this.passErrorFields.includes(item)
        // );
      }
    }
  }
  onPassword(event: Event) {
    const target = event.target as HTMLInputElement;
    const errArray: string[] = [...this.passErrorFields].filter(
      (item) => item !== passErrorSchema.match
    );
    try {
      const data = passwordSchema.parse(target.value);
      this.passwordRequirements = errArray;
    } catch (error: any) {
      const errMsgs: string[] = error.errors.map((item: any) => item.message);
      this.passwordRequirements = errArray.filter(
        (item) => !errMsgs.includes(item)
      );
    }
    this.onPasswordConfirm(event);
    if (target.value.length <= 0) {
      this.passwordRequirements = [];
    }
  }
  onPasswordConfirm(event: Event) {
    const target = event.target as HTMLInputElement;
    if (
      ((target.value === this.password?.nativeElement.value &&
        target !== this.password.nativeElement) ||
        (target.value === this.confirmPassword?.nativeElement.value &&
          target !== this.confirmPassword.nativeElement)) &&
      !!target.value
    ) {
      this.passwordRequirements.push(passErrorSchema.match);
    } else {
      this.passwordRequirements = this.passwordRequirements.filter(
        (item) => item !== passErrorSchema.match
      );
    }
  }
  private parseError(errors: ZodError) {
    const results: Record<string | number, string[]> = {};
    for (const error of errors.errors) {
      error.path.forEach((item) => {
        if (results[item]) {
          results[item] = [...results[item], error.message];
        } else {
          results[item] = [error.message];
        }
      });
    }
    return results;
  }
  closeModal(form: NgForm) {
    this.onClose.emit(false);
    form.reset();
  }
  showLogin() {
    this.onClose.emit(false);
    this.onBackToLogin.emit(true);
  }
}
