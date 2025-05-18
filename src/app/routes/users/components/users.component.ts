import {Component, OnInit} from '@angular/core';
import {ModalService} from '@developer-partners/ngx-modal-dialog';
import {FormUsersComponent} from './form-users/form-users.component';
import {UsersService} from '../../../service/user.service';
import {UserDTO} from '../../../dto/user-dto';
import {BasePage} from '../../../base/base-page';
import {UserFilter} from '../../../filter/user-filter';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent extends BasePage<UserDTO, UserFilter> implements OnInit {

  protected columns = [
    { name: 'name', label: 'Nome do Usuário', sortable: true },
    { name: 'email', label: 'E-mail de Contato', sortable: true },
    { name: 'phone', label: 'Telefone', sortable: true },
    { name: 'registrationDate', label: 'Data do registro', sortable: true }
  ];

  protected buttons = [
    { label: 'Editar', class: 'btn-primary', click: this.editItem.bind(this) },
    { label: 'Excluir', class: 'btn-danger', click: this.deleteItem.bind(this) }
  ];

  constructor(modalService: ModalService, _service: UsersService
  ) {
    super(modalService, _service, FormUsersComponent);
  }

  ngOnInit(): void {
     this.list();
  }

}
