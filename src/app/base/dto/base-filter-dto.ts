import {Functions} from '../../shared/util/functions';

export class BaseFilterDTO {

  public page?: number;
  public size?: number;
  public sortField?: string;
  public sortDirection?: string;
  public unpaged?:boolean = false;

  public clear?() {
        Object.keys(this).forEach(e => {
            const value = this[e as keyof BaseFilterDTO] as any;

            if (!e.startsWith('_') && typeof value !== 'function') {
                (this as any)[e] = undefined;
            }
        });

        this.sortField = Functions.clone(this.sortField);
        this.sortDirection = Functions.clone(this.sortDirection);
        this.unpaged = Functions.clone(this.unpaged);
    }
}
