import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../service/user.service';
import {BooksService} from '../../../service/book.service';
import {LendingService} from '../../../service/lending.service';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import {NgxPaginationModule} from 'ngx-pagination';
import {PagedBookResponse} from '../../../models/paged-book-response.model';
import {Book} from '../../../models/book.model';
import {FormBooksComponent} from '../../books/components/form-books/form-books.component';
import {PagedLoanResponse} from '../../../models/paged-loans-response-model';
import {Loan} from '../../../models/loan.model';
import {ModalService} from '@developer-partners/ngx-modal-dialog';
import {FormLoansComponent} from './form-loans/form-loans.component';

@Component({
  selector: 'app-books-lending',
  templateUrl: './books-lending.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerComponent
  ],
  styleUrls: ['./books-lending.component.html']
})
export class BooksLendingComponent implements OnInit {
  users: any[] = [];
  booksLending: any[] = [];
  selectedUserId!: number;
  selectedBookId!: number;
  page: number = 1;
  pageSize: any;
  loans!: PagedLoanResponse<Loan>;
  count: any;


  constructor(
    private lendingService: LendingService,
    private userService: UsersService,
    private readonly bookService: BooksService,
    private ngxSpinnerService: NgxSpinnerService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadBooksLending();
    this.retrieveLendings()
  }

  loadUsers(): void {
    this.userService.getAllList().subscribe((data) => {
      this.users = data;
    });
  }

  loadBooksLending(): void {
    this.bookService.getAllWithoutLending().subscribe((data: any[]) => {
      this.booksLending = data;
    });
  }

  createLending(): void {
    this.lendingService.createLending(this.selectedUserId, this.selectedBookId).subscribe({
      next: (response) => {
        this.handleSuccess(response);
      },
      error: (error) => this.handleError(error)
    });
  }

  private handleSuccess(response: any): void {
    this.ngxSpinnerService.hide();
      this.showSuccessMessage();
  }

  private handleError(error: any): void {
    this.ngxSpinnerService.hide();
    console.error('Erro ao realizar empréstimo:', error);
  }

  private showSuccessMessage(): void {
    Swal.fire({
      scrollbarPadding: false,
      heightAuto: false,
      title: 'Sucesso!',
      text: 'Empréstimo realizado com sucesso!',
      icon: 'success',
      confirmButtonText: 'Fechar'
    }).then(r => {
      this.loadBooksLending()
      this.retrieveLendings()
    });
  }

  retrieveLendings(): void {
    this.lendingService.getAll(this.page, this.pageSize).subscribe({
      next: (data: PagedLoanResponse<Loan>) => {
        this.loans = data;
        this.pageSize= this.loans.page.size
        this.count = this.loans.page.totalElements;
      },
      error: (e) => console.error(e)
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.retrieveLendings();
  }


  editLending(loan: Loan) {
      this.modalService.show<Loan>(FormLoansComponent, {
        title: 'Editar informações',
        model: loan,
      }).result().subscribe({next: loan => {
          let index = this.loans._embedded.loanResponseList.indexOf(loan);
          this.loans._embedded.loanResponseList[index] = loan;
          this.retrieveLendings();
        }
      })
  }
}
