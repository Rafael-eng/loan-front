import {Book} from './book.model';
import {User} from './user.model';

export interface Loan {
  id: number;
  user: User;
  book: Book;
  loanDate: string;
  returnDate: string;
  status: string;
}
