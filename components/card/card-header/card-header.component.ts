import {Component, Input} from '@angular/core';

@Component({
    selector: 'card-header',
    templateUrl: './card-header.component.html'
})
export class CardHeaderComponent {
    @Input('image-source')
    public header_image: string;

    @Input('image-width')
    public header_image_width: string;

    @Input('has-no-border-radius')
    public has_no_border_radius: boolean;

    @Input('title')
    public header_title: string;

    @Input('fa-icon')
    public fa_icon: string;

    @Input()
    public name: string;
}
