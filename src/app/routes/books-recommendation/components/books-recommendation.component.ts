import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Book} from '../../../models/book.model';
import {ModalService} from '@developer-partners/ngx-modal-dialog';
import {BooksService} from '../../../service/book.service';
import {PagedBookResponse} from '../../../models/paged-book-response.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-books-recommendation',
  templateUrl: './books-recommendation.component.html',
  styleUrl: './books-recommendation.component.scss'
})
export class BooksRecommendationComponent implements OnInit {
  page: number = 1;
  pageSize: any;
  books!: PagedBookResponse<Book>;
  count: any;

  userId!: number;

  constructor(private readonly modalService: ModalService, private booksService: BooksService, private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId']
      this.retrieveBooks(this.userId);
    });
  }

  retrieveBooks(userId: number): void {
    this.booksService.getAllRecommended(this.page, this.pageSize, this.userId).subscribe({
      next: (data: PagedBookResponse<Book>) => {
        this.books = data;
        this.pageSize= this.books.page.size
        this.count = this.books.page.totalElements;
      },
      error: (e) => console.error(e)
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.retrieveBooks(this.userId);
  }

}
