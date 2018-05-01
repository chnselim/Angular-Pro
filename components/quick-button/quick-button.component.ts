import {Component, Input} from '@angular/core';
import {Clipboard} from 'ts-clipboard';

@Component({
    selector: 'quick-button',
    templateUrl: './quick-button.component.html'
})
export class QuickButtonComponent {

    @Input('value')
    public button_value: string;

    @Input('color-class')
    public button_color: string;

    @Input('fa-icon')
    public button_icon: string;

    @Input('size')
    public button_size: string;

    @Input()
    public clipboard: string;

    @Input('popover-dismiss-time')
    public popover_dismiss_time: number = 1000;

    @Input('popover-content')
    public popover_content: string;

    @Input('router-link')
    public router_link: string;

    @Input()
    public tooltip: string;

    @Input('tooltip-placement')
    public tooltip_placement: string = 'top';

    public copyToClipboard(clipboard_key) {
        Clipboard.copy(clipboard_key);
    }
}
