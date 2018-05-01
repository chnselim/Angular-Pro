import {Component, Input} from '@angular/core';

@Component({
    selector: 'info',
    templateUrl: './info-tooltip.component.html'
})
export class InfoTooltipComponent {

    @Input('value')
    public information_value: string;

    @Input('fa-icon')
    public fa_icon: string = 'info-circle';
}
