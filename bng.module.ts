import {QuickTableComponent} from "./components/quick-table/quick-table.component";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {QuickTableColumnDirective} from "./components/quick-table/quick-table-column.directive";
import {QuickTableBadgeComponent} from "./components/quick-table/quick-table-badge.component";

@NgModule({
    declarations: [
        QuickTableComponent,
        QuickTableColumnDirective,
        QuickTableBadgeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        QuickTableComponent,
        QuickTableColumnDirective,
        QuickTableBadgeComponent
    ]
})
export class BNGModule {
}
