import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {BaseDTO} from '../dto/base-dto';
import {environment} from '../../shared/environment/environment';
import {BaseFilterDTO} from '../dto/base-filter-dto';

export interface PagedResponse<T> {
  content?: T[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export abstract class BaseService<T extends BaseDTO>{
  items: T[] = [];
  loading = false;
  apiUrl = '';

  constructor(protected http: HttpClient, protected endpoint: string) {
    this.apiUrl = `${environment.baseUrl}/${endpoint}`;
  }

  list(filter: BaseFilterDTO ): Observable<PagedResponse<T>> {
    this.loading = true;
    console.log(filter)

    filter.sortDirection = filter.sortDirection ?? 'ASC';
    filter.sortField = filter.sortField ?? 'id';
    filter.page = filter.page ?? 0;
    filter.size = filter.size ?? 5;
    filter.unpaged = filter.unpaged ?? false;


    const params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.size)
      .set('sortDirection', filter.sortDirection)
      .set('sortField', filter.sortField)
      .set('unpaged', filter.unpaged);


    return this.http.get<PagedResponse<T>>(this.apiUrl, { params }).pipe(
      tap({
        next: (data) => {
          // Verificar se a resposta contém 'content'
          this.items = data?.content ?? [];  // Usar array vazio caso 'content' seja undefined ou null
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          console.error('Erro ao carregar lista');
        }
      })
    );
  }

  persist(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  persistMany(item: Array<T>): Observable<Array<T>> {
    return this.http.post<Array<T>>(this.apiUrl, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
