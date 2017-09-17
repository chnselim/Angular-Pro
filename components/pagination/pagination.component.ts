import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {

    @Output('onPageChanged')
    public current_page_changed: EventEmitter<number> = new EventEmitter<number>();

    @Input('total-item-count')
    public total_item_count = 0;

    @Input('max-shown-page-count')
    public max_shown_page_count = 11;

    @Input('item-count-per-page')
    public get item_count_per_page(): number {
        return this.internal_item_count_per_page;
    }

    public set item_count_per_page(value: number) {
        if (value > 0) {
            this.internal_item_count_per_page = value;
        }
    }

    @Input('current-page')
    public get current_page(): number {
        return this.internal_current_page;
    }

    public set current_page(value: number) {
        if (value > 0) {
            this.internal_current_page = value;
        }
    }

    private internal_item_count_per_page = 20;
    private internal_current_page = 1;

    protected get total_page_count(): number {
        const total_page_count = Math.ceil(this.total_item_count / this.item_count_per_page);
        if (total_page_count > 0) {
            return total_page_count;
        }

        return 0;
    }

    protected get shown_page_count(): number {
        if (this.total_page_count > this.max_shown_page_count) {
            return this.max_shown_page_count;
        }
        return this.total_page_count;
    }

    protected get start_page_index(): number {

        const center_number_index_of_pages = Math.ceil(this.max_shown_page_count / 2);
        let center_of_pages = center_number_index_of_pages;

        if (this.current_page > center_of_pages) {
            center_of_pages = this.current_page;
        }

        if (center_of_pages + center_number_index_of_pages > this.total_page_count) {
            center_of_pages = this.total_page_count - center_number_index_of_pages + 1;
        }

        let start_page_index = center_of_pages - center_number_index_of_pages + 1;
        if (start_page_index < 1) {
            start_page_index = 1;
        }
        return start_page_index;
    }

    protected fireOnPageChanged(params: number) {
        this.current_page_changed.emit(params);
    }
}
