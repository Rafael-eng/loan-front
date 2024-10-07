import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Loan} from '../../../../models/loan.model';
import {ModalReference} from '@developer-partners/ngx-modal-dialog';
import {
  RequiredFieldErrorComponent
} from '../../../../shared/components/required-field-error/required-field-error.component';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";
import {LendingService} from '../../../../service/lending.service';

@Component({
  selector: 'app-form-loans',
  templateUrl: './form-loans.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RequiredFieldErrorComponent
  ],
  styleUrls: ['./form-loans.component.scss']
})
export class FormLoansComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;

  @Input() loan!: Loan;

  constructor(private formBuilder: FormBuilder,
              private readonly modalReference: ModalReference<Loan>,
              private readonly loansService: LendingService,
              private ngxSpinnerService: NgxSpinnerService) {
    if(this.modalReference.config.model){
      this.loan = this.modalReference.config.model
    }
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.loan) {
      this.formGroup.patchValue(this.loan);
    }
  }

  ngOnDestroy(): void {
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      status: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
    });
  }

  cancel(): void {
    this.modalReference.cancel();
  }

  saveData(): void {
    if (this.formGroup.valid) {
      this.ngxSpinnerService.show();
      const data = {...this.loan, ...this.formGroup.value};
      if (data.id)
        this.updateLoan(data);
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
      text: 'Livro salvo com sucesso!',
      icon: 'success',
      confirmButtonText: 'Fechar'
    });
  }

  private updateLoan(data: any): void {
    this.loansService.updateLending(data).subscribe({
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
    console.error('Erro ao salvar livro:', error);
  }

}
