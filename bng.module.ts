import {QuickTableComponent} from './components/quick-table/quick-table.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {QuickTableColumnDirective} from './components/quick-table/quick-table-column.directive';
import {BadgeComponent} from './components/badge/badge.component';
import {QuickSelectComponent} from './components/quick-select/quick-select.component';
import {QuickSelectItemDirective} from './components/quick-select/quick-select-item.directive';
import {RepeatModule} from 'ngrepeat/repeat.module';
import {PaginationComponent} from './components/pagination/pagination.component';
import {SmartTableComponent} from './components/smart-table/smart-table.component';

@NgModule({
    declarations: [
        QuickTableComponent,
        QuickTableColumnDirective,
        BadgeComponent,
        QuickSelectComponent,
        QuickSelectItemDirective,
        PaginationComponent,
        SmartTableComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RepeatModule
    ],
    exports: [
        QuickTableComponent,
        QuickTableColumnDirective,
        BadgeComponent,
        QuickSelectComponent,
        QuickSelectItemDirective,
        PaginationComponent,
        SmartTableComponent
    ]
})
export class BNGModule {
}
