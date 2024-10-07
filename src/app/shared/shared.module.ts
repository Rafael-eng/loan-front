import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';



import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    providers: [],
    declarations: [
    ],
    exports: [
    ],
})

export class SharedModule {
    constructor(localeService: BsLocaleService) {
        ptBrLocale.invalidDate = '';
        defineLocale('pt-br', ptBrLocale);
        localeService.use('pt-br');
    }

    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
        };
    }
}
