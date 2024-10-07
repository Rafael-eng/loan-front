import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Book} from '../../../models/book.model';
import {ModalService} from '@developer-partners/ngx-modal-dialog';
import {FormBooksComponent} from './form-books/form-books.component';
import {BooksService} from '../../../service/book.service';
import {PagedBookResponse} from '../../../models/paged-book-response.model';
import {GoogleBookApiItems, SearchResults, VolumeInfo} from '../../../models/google-book-api.model';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  page: number = 1;
  pageSize: any;
  books!: PagedBookResponse<Book>;
  count: any;
  public isbnExists = false;
  pageGoogleApiTable: number = 1;
  pageSizeGoogleApiTable: any;
  countGoogleApiTable: any;
  searchTitle: any;
  protected searchResults: SearchResults = {
    pageSize: 0,
    page: 0,
    items: []
  };


  @ViewChild(FormBooksComponent) formBooksComponent!: FormBooksComponent;


  constructor(private readonly modalService: ModalService, private booksService: BooksService, private ngxSpinnerService: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.booksService.getAll(this.page, this.pageSize).subscribe({
      next: (data: PagedBookResponse<Book>) => {
        this.books = data;
        this.pageSize = this.books.page.size
        this.count = this.books.page.totalElements;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveBooksFromGoogle(): void {
    this.booksService.searchFromGoogleApi(this.pageGoogleApiTable, this.pageSizeGoogleApiTable, this.searchTitle).subscribe({
      next: (data: any) => {
        this.searchResults = data;
        this.pageSizeGoogleApiTable = data.pageSize
        this.countGoogleApiTable = data.totalElements;
      },
      error: (e) => console.error(e)
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.retrieveBooks();
  }

  createBook(): void {
    this.modalService.show<Book>(FormBooksComponent, {
      title: 'Adicionar livro',
    }).result().subscribe(addBook => {
      this.books._embedded.bookResponseList.push(addBook);
    })
  }

  editBook(book: Book): void {
    this.modalService.show<Book>(FormBooksComponent, {
      title: 'Editar informações',
      model: book,
    }).result().subscribe(book => {
      let index = this.books._embedded.bookResponseList.indexOf(book);
      this.books._embedded.bookResponseList[index] = book;
      this.retrieveBooks();
    })
  }

  pageChangeEventGoogleApi(event: number) {
    this.pageGoogleApiTable = event;
    this.retrieveBooksFromGoogle();
  }

  private createBookFromGoogleApi(data: any): void {
    this.booksService.createBook(data).subscribe({
      next: (response) => {
        this.handleSuccess(response, data)
        location.reload();
      },
      error: (error) => this.handleError(error)
    });
  }


  private handleSuccess(response: any, data: any): void {
    this.ngxSpinnerService.hide();
    if (response && response.id) {
      this.showSuccessMessage();
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

  private handleError(error: any): void {
    this.ngxSpinnerService.hide();
    console.error('Erro ao salvar livro:', error);
  }

  verifyIsbnExists(isbn: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.booksService.existsIsbn(isbn, 0).subscribe(res => {
        this.isbnExists = res;
        if (this.isbnExists) {
          Swal.fire({
            scrollbarPadding: false,
            heightAuto: false,
            title: 'Falha!',
            text: 'O ISBN desse livro já foi cadastrado!',
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
        }
        resolve(res);
      });
    });
  }

  addBook(bookGoogleApi: GoogleBookApiItems) {
    const book = this.convertToBook(bookGoogleApi.volumeInfo);

    this.verifyIsbnExists(book.isbn).then(res => {
      if (!res) {
        this.createBookFromGoogleApi(book);
      } else {
        console.error('O ISBN já existe, livro não adicionado.');
      }
    });
  }

  convertToBook(volumeInfo: VolumeInfo): Book {
    const author = volumeInfo.authors.length > 0 ? volumeInfo.authors[0] : 'Desconhecido';
    const isbn = volumeInfo.industryIdentifiers.length > 0 ? volumeInfo.industryIdentifiers[0].identifier : '';
    const publicationDate = new Date(volumeInfo.publishedDate);
    return {
      id: null,
      title: volumeInfo.title,
      author,
      category: '',
      isbn,
      publicationDate
    };
  }

}
