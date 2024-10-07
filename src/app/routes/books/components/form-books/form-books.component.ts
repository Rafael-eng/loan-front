import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Book} from '../../../../models/book.model';
import {ModalReference} from '@developer-partners/ngx-modal-dialog';
import {
  RequiredFieldErrorComponent
} from '../../../../shared/components/required-field-error/required-field-error.component';
import {BooksService} from '../../../../service/book.service';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-books',
  templateUrl: './form-books.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RequiredFieldErrorComponent
  ],
  styleUrls: ['./form-books.component.scss']
})
export class FormBooksComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;

  @Input() book!: Book;
  @Output() dataUpdated = new EventEmitter<any>();
  public isbnExists = false;

  constructor(private formBuilder: FormBuilder,
              private readonly modalReference: ModalReference<Book>,
              private readonly booksService: BooksService,
              private ngxSpinnerService: NgxSpinnerService) {
    if(this.modalReference.config.model){
      this.book = this.modalReference.config.model
    }
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.book) {
      this.formGroup.patchValue(this.book);
    }
  }

  ngOnDestroy(): void {
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      category: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      publicationDate: ['', [Validators.required]]
    });
  }

  cancel(): void {
    this.modalReference.cancel();
  }

  verifyIsbnExists(event: any):void{
    let bookId = this.book?.id ? this.book?.id : 0;
    this.booksService.existsIsbn(event, bookId).subscribe(res => {
      this.isbnExists = res;
    })
  }

  saveData(): void {
    if (this.formGroup.valid && !this.isbnExists) {
      this.ngxSpinnerService.show();
      const data = {...this.book, ...this.formGroup.value};
      if (data.id) {
        this.updateBook(data);
      } else {
        this.createBook(data);
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
      text: 'Livro salvo com sucesso!',
      icon: 'success',
      confirmButtonText: 'Fechar'
    });
  }

  private createBook(data: any): void {
    this.booksService.createBook(data).subscribe({
      next: (response) => {this.handleSuccess(response, data)
        location.reload();
      },
      error: (error) => this.handleError(error)
    });
  }

  private updateBook(data: any): void {
    this.booksService.updateBook(data).subscribe({
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
