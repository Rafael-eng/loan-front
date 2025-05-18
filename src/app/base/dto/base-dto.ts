import {format, isValid} from 'date-fns';

export abstract class BaseDTO {
    public id?: number | string;
    public _editing?: boolean; // indica se o formulario esta sendo editado
    public _title?: string; // usado para passar um titulo para as paginas


    constructor(model?: BaseDTO) {
        if (model) {
            this.id = model.id;

            this._editing = model.id !== undefined && model.id !== null && +model.id > 0;
            this._title = model._title;
        }
    }

    public getPayload() {
        let payload = {} as any;
        Object.keys(this).forEach(e => {
            if (!e.startsWith('_')) {

                const value = this[e as keyof BaseDTO] as any;

                if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        payload[e] = (value as any).map((ee: any) => {
                            if ((ee as any).getPayload) {
                                return (ee as any).getPayload();
                            } else {
                                return ee;
                            }
                        })
                        .filter((ee: any) => ee);
                    } else {
                      if (value && value instanceof Date) {
                        if (isValid(value)) {
                          payload[e] = format(value, 'yyyy-MM-dd HH:mm');
                        }
                      } else if (value && (value as any).getPayload) {
                        payload[e] = (value as any).getPayload();
                      }
                    }
                } else if (typeof value !== 'function') {
                    payload[e] = value;
                }

            }
        });

        return payload;
    }

    protected static setPayload?: (json: any) => BaseDTO = undefined;
}
