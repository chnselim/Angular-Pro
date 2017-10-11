import {Headers} from '@angular/http';

export class ResponseModel<T> {
    constructor(private body: T, private headers: Headers, public status: number) {
    }

    getBody() {
        return this.body;
    }

    getHeaders() {
        return this.headers;
    }
}
