import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from '../../../models/user.model';
import {ModalService} from '@developer-partners/ngx-modal-dialog';
import {FormUsersComponent} from './form-users/form-users.component';
import {UsersService} from '../../../service/user.service';
import {PagedUserResponse} from '../../../models/paged-user-response.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  page: number = 1;
  pageSize: any;
  users!: PagedUserResponse<User>;
  count: any;

  @ViewChild(FormUsersComponent) formUsersComponent!: FormUsersComponent;

  constructor(private readonly modalService: ModalService, private usersService: UsersService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.usersService.getAll(this.page, this.pageSize).subscribe({
      next: (data: PagedUserResponse<User>) => {
        this.users = data;
        this.pageSize= this.users.page.size
        this.count = this.users.page.totalElements;
      },
      error: (e) => console.error(e)
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.retrieveUsers();
  }

  createUser(): void {
    this.modalService.show<User>(FormUsersComponent, {
      title: 'Adicionar livro',
    }).result().subscribe(addUser => {
      this.users._embedded.userResponseList.push(addUser);
      this.retrieveUsers();
    })
  }

  editUser(user: User): void {
    this.modalService.show<User>(FormUsersComponent, {
      title: 'Editar informações',
      model: user,
    }).result().subscribe(user => {
      let index = this.users._embedded.userResponseList.indexOf(user);
      this.users._embedded.userResponseList[index] = user;
      this.retrieveUsers();
    })
  }

  redirectRecommended(userId: number): void {
    this.router.navigate(['/recommendation'], { queryParams: { userId: userId } });
  }
}
