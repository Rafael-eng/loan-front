import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalReference} from '@developer-partners/ngx-modal-dialog';
import {
  RequiredFieldErrorComponent
} from '../../../../shared/components/required-field-error/required-field-error.component';
import {UsersService} from '../../../../service/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserDTO} from '../../../../dto/user-dto';
import {BaseFormComponent} from '../../../../base/base-form-component';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RequiredFieldErrorComponent
  ],
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent extends BaseFormComponent<UserDTO> implements OnDestroy {

  constructor(private formBuilder: FormBuilder,
              modalReference: ModalReference<UserDTO>,
              private _service: UsersService,
              private ngxSpinnerService: NgxSpinnerService) {
    super(formBuilder, _service, modalReference);
  }

  ngOnDestroy(): void {
  }

  override ngOnInit() {
    super.ngOnInit();
  }


  override createForm(): void {
    super.createForm();
    this.form.addControl('name', this.formBuilder.control(this.initialData?.name, Validators.required));
    this.form.addControl('email', this.formBuilder.control(this.initialData?.email, [Validators.required, Validators.email]));
    this.form.addControl('phone', this.formBuilder.control(this.initialData?.phone, Validators.required));
    this.form.addControl('registrationDate', this.formBuilder.control(new Date().toISOString().split('T')[0], Validators.required));
  }

}
