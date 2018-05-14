import {Component, Input} from '@angular/core';
import {ComponentBase} from '../base.component';

@Component({
    selector: 'badge',
    templateUrl: 'badge.component.html',
    styleUrls: ['badge.component.scss'],
    providers: [{provide: ComponentBase, useExisting: BadgeComponent}]
})
export class BadgeComponent extends ComponentBase {
    @Input('background-color')
    public background_color: string;

    @Input()
    public color: string;

    @Input()
    public href: string;

    @Input('sub-content')
    public sub_content: string;
}
