import { BaseDTO } from "../../base";

export class Functions {

    public static editing = (model?: BaseDTO): boolean => {
        return model && model.id !== undefined && model.id !== null && +model.id > 0
            ? true
            : false;
    }

    public static clone(payload: any) {
        if (!payload) {
            return undefined;
        }

        return JSON.parse(JSON.stringify(payload));
    }

    public static isEmail(email: string) {
        return new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(String(email).toLowerCase());
    }

    public static isNotEmpty(items: any) {
        return !this.isEmpty(items);
    }

    public static isEmpty(items: any) {
        if (items === null || items === undefined) {
            return true;
        }

        if (Array.isArray(items)) {
            return items.length === 0;
        }

        if (typeof items === 'number') {
            const value = this.toNumber(items);
            return value === 0;
        }

        if (typeof items === 'string') {
            return items.trim().length === 0;
        }

        if (typeof items === 'object') {
            return Object.keys(items).length === 0;
        }

        return false;
    }

    public static isEmptyDomain(item: any) {
        return !item || (item && !item.id);
    }

    public static toNumber(value: any) {
        try {
            const num = parseInt(value);
            if (isNaN(num)) {
                return 0;
            }

            return num;
        } catch (e) { }

        return 0;
    }

    public static onlyNumber(event: any): string {
        const value = event.target.value;
        try {
            return value.replace(/\D/g, '');
        } catch (e) {
            return value;
        }
    }

}
