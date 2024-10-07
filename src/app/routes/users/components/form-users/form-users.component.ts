import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../../../models/user.model';
import {ModalReference} from '@developer-partners/ngx-modal-dialog';
import {
  RequiredFieldErrorComponent
} from '../../../../shared/components/required-field-error/required-field-error.component';
import {UsersService} from '../../../../service/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RequiredFieldErrorComponent
  ],
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;

  @Input() user!: User;

  constructor(private formBuilder: FormBuilder,
              private readonly modalReference: ModalReference<User>,
              private readonly usersService: UsersService,
              private ngxSpinnerService: NgxSpinnerService) {
    if(this.modalReference.config.model){
      this.user = this.modalReference.config.model
    }
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.user) {
      this.formGroup.patchValue(this.user);
    }
  }

  ngOnDestroy(): void {
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  cancel(): void {
    this.modalReference.cancel();
  }

  saveData(): void {
    if (this.formGroup.valid) {
      this.ngxSpinnerService.show();
      const data = {...this.user, ...this.formGroup.value};
      if (data.id) {
        this.updateUser(data);
      } else {
        this.createUser(data);
      }
      this.formGroup.markAsPristine();
      this.formGroup.markAsUntouched();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private showSuccessMessage(): void {
    Swal.fire({
      scrollbarPadding: false,
      heightAuto: false,
      title: 'Sucesso!',
      text: 'Usuário salvo com sucesso!',
      icon: 'success',
      confirmButtonText: 'Fechar'
    });
  }

  private createUser(data: any): void {
    this.usersService.createUser(data).subscribe({
      next: (response) => {this.handleSuccess(response, data)
        location.reload();
      },      error: (error) => this.handleError(error)
    });
  }

  private updateUser(data: any): void {
    this.usersService.updateUser(data).subscribe({
      next: (response) => this.handleSuccess(response, data),
      error: (error) => this.handleError(error)
    });
  }

  private handleSuccess(response: any, data: any): void {
    this.ngxSpinnerService.hide();
    if (response && response.id) {
      this.showSuccessMessage();
    }
    this.modalReference.closeSuccess(data);
  }

  private handleError(error: any): void {
    this.ngxSpinnerService.hide();
    console.error('Erro ao salvar Usuário:', error);
  }

}
