import {Component, Input} from '@angular/core';
import {ComponentBase} from '../base.component';

@Component({
    selector: 'badge',
    templateUrl: 'badge.component.html',
    providers: [{provide: ComponentBase, useExisting: BadgeComponent}]
})
export class BadgeComponent extends ComponentBase {
    @Input('background-color')
    public backgroundColor: string;

    @Input()
    public color: string;
}
