import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { isDescendant } from 'src/utils/util-functions';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  @ViewChild('formRef') formRef!: NgForm;
  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  @ViewChild('button') buttonRef!: ElementRef<HTMLButtonElement>;
  public formData: Record<string, string> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };
  public modalVisible: boolean = false;
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.formData);

      this.modalVisible = true;
      this.formRef.resetForm();
    }
  }
  onCloseModal(event: Event) {
    event.stopPropagation();
    if (
      !isDescendant(event.target as HTMLElement, this.modalRef.nativeElement) ||
      (event.target as HTMLElement) === this.buttonRef.nativeElement
    ) {
      this.modalVisible = false;
    }
  }
}
