import {inject, Type} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import {BaseDTO} from './dto/base-dto';
import {BaseFilterDTO} from './dto/base-filter-dto';
import {BaseService, PagedResponse} from './service/base-service';
import {lastValueFrom} from 'rxjs';
import {BaseFormComponent} from './base-form-component';
import {ModalService} from '@developer-partners/ngx-modal-dialog';
import {Functions} from '../shared/util/functions';

export abstract class BasePage<T extends BaseDTO, F extends BaseFilterDTO
> {
  protected _spinner = inject(NgxSpinnerService);
  private $service: BaseService<any>;

  constructor(private modalService: ModalService, _service?: any, private component?: Type<BaseFormComponent<T>>) {
    this.$service = _service;
  }


  protected elements: T[] = [];
  protected filters: F;
  protected data: PagedResponse<T> = {
    content: [],
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0
  };

  totalRecords!: number;
  page: number = 0;
  size: number = 5;
  sortDirection = 'ASC';
  sortField = 'id';
  unpaged = false;

  protected async list(event?: any): Promise<PagedResponse<T>> {
    if (event) {
      this.page = event.page ?? 0;
      this.size = event.size ?? 5;
      this.sortDirection = event.sortDirection ?? 'ASC';
      this.sortField = event.sortField ?? 'id';
    }

    try {
      this._spinner.show()
      const response = await lastValueFrom(this.$service.list({ page: this.page, size: this.size, unpaged: this.unpaged,
      sortDirection: this.sortDirection, sortField: this.sortField }));

      this.elements = response?.content ?? [];
      this.totalRecords = response?.totalElements ?? 0;
      this.data = response;

      return response;
    } catch (error: any) {
      console.error('Erro ao carregar lista:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error?.message || 'Erro desconhecido',
        confirmButtonText: 'OK',
      });
      this.elements = [];
      throw error;
    } finally {
      this.afterList();
      this._spinner.hide()
    }
  }

  protected async pageChangeEvent(event: number) {
    this.page = event;
    await this.list(this.filters);
  }

  protected afterList(): void {
    /* TODO document why this method 'afterList' is empty */
  }

  editItem(model: T): void {
    this.create(model);
  }

  deleteItem(item?: T): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.$service.delete(Functions.toNumber(item?.id)).subscribe(() => {
          this.data.content = this.data.content?.filter((i) => i.id !== Functions.toNumber(item?.id));
          this.list();

          Swal.fire({
            title: 'Excluído!',
            text: 'O item foi excluído com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        });
      } else {
        console.log('Ação de exclusão cancelada');
      }
    });
  }

  onFiltersChange(newFilters: F): void {
    this.list({page: this.page, size: this.size, unpaged: this.unpaged, sortDirection: newFilters.sortDirection, sortField: newFilters.sortField});
  }

  create<T extends BaseDTO>(model?: T): void {
    if (this.component) {
      this.modalService.show<T>(this.component, {
        title: model ? 'Editar' : 'Novo',
        model: model
      }).result().subscribe((item: T) => {
        this.list();
      });
    }
  }


}
