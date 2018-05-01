import {QuickTableComponent} from './components/quick-table/quick-table.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {QuickTableColumnDirective} from './components/quick-table/quick-table-column.directive';
import {QuickButtonComponent} from './components/quick-button/quick-button.component';
import {BadgeComponent} from './components/badge/badge.component';
import {InfoTooltipComponent} from './components/info-tooltip/info-tooltip.component';
import {QuickSelectComponent} from './components/quick-select/quick-select.component';
import {QuickSelectItemDirective} from './components/quick-select/quick-select-item.directive';
import {RepeatModule} from 'ngrepeat/repeat.module';
import {PaginationComponent} from './components/pagination/pagination.component';
import {SmartTableComponent} from './components/smart-table/smart-table.component';
import {LoaderComponent} from './components/loader/loader.component';
import {RouterModule} from '@angular/router';
import {CardHeaderComponent} from './components/card/card-header/card-header.component';
import {CardContentComponent} from './components/card/card-content/card-content.component';
import {CardFooterComponent} from './components/card/card-footer/card-footer.component';
import {CardContentRowComponent} from './components/card/card-content-row/card-content-row.component';
import {CardComponent} from './components/card/card.component';
import {MultiSelectBoxComponent} from './components/multi-select-box/multi-select-box.component';
import {PopoverModule} from 'ngx-popover';

@NgModule({
    declarations: [
        QuickTableComponent,
        QuickTableColumnDirective,
        QuickButtonComponent,
        BadgeComponent,
        QuickSelectComponent,
        QuickSelectItemDirective,
        PaginationComponent,
        SmartTableComponent,
        MultiSelectBoxComponent,
        LoaderComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardContentRowComponent,
        InfoTooltipComponent,
        CardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RepeatModule,
        RouterModule,
        PopoverModule
    ],
    exports: [
        QuickTableComponent,
        QuickTableColumnDirective,
        QuickButtonComponent,
        BadgeComponent,
        QuickSelectComponent,
        QuickSelectItemDirective,
        PaginationComponent,
        SmartTableComponent,
        MultiSelectBoxComponent,
        LoaderComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardContentRowComponent,
        InfoTooltipComponent,
        CardComponent
    ]
})
export class BNGModule {
}
