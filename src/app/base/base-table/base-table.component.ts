import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {NgClass, NgSwitch} from '@angular/common';
import {PagedResponse} from '../service/base-service';
import {BaseDTO} from '../dto/base-dto';
import {BaseFilterDTO} from '../dto/base-filter-dto';

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [
    NgxPaginationModule,
    FormsModule,
    NgSwitch,
    NgClass
  ],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss'
})
export class BaseTableComponent<T extends BaseDTO> implements OnInit {
  @Input() data: PagedResponse<T>;
  @Input() columns: {
    name: string;
    label: string;
    sortable: boolean;
  }[] = [];
  @Input() size: number;
  @Input() page: number;
  @Input() totalRecords: number;
  @Input() buttons: { label: string, class: string, click: (row: any) => void }[] = [];
  @Input() hasCheckbox = false;
  @Input() filters: BaseFilterDTO;
  @Output() pageChange = new EventEmitter<number>();
  @Output() filtersChange = new EventEmitter<BaseFilterDTO>();


  selectedItems = new Set<any>();

  constructor() {}

  ngOnInit() {
  }

  getColumnValue(item: any, column: string): string {
    return item[column] || '';
  }

  protected async pageChangeEvent(event: number) {
    this.pageChange.emit(event);
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedItems = new Set(this.data.content);
    } else {
      this.selectedItems.clear();
    }
  }

  setPageSize(size: number) {
    this.size = size; // Atualiza o tamanho da página
    this.page = 1;    // Reseta para a primeira página
  }

  toggleSelectItem(item: any) {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.has(item);
  }

  isAllSelected(): boolean {
    return this.data.content.every(item => this.selectedItems.has(item));
  }

  onSort(field: string): void {
    if (!this.filters) {
      this.filters = new BaseFilterDTO(); // Inicializa caso ainda não tenha sido feita
    }
    if (this.filters.sortField === field) {
      if (this.filters.sortDirection === 'ASC') {
        this.filters.sortDirection = 'DESC';
      } else if (this.filters.sortDirection === 'DESC') {
        this.filters.sortField = undefined;
        this.filters.sortDirection = undefined;
      } else {
        this.filters.sortDirection = 'ASC';
      }
    } else {
      this.filters.sortField = field;
      this.filters.sortDirection = 'ASC';
    }

    // Emitir as mudanças para o componente pai
    this.filtersChange.emit(this.filters);
    this.pageChange.emit(this.page);
  }

  isAscending(field: string): boolean {
    if (!this.filters) {
      return false;
    }
    return this.filters.sortField === field && this.filters.sortDirection === 'ASC';
  }

  isDescending(field: string): boolean {
    if (!this.filters) {
      return false;
    }
    return this.filters.sortField === field && this.filters.sortDirection === 'DESC';
  }


}
