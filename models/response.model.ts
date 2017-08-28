import {Headers} from '@angular/http';

export class ResponseModel<T> {
    constructor(private body: T, private headers: Headers) {
    }

    getBody() {
        return this.body;
    }

    getHeaders() {
        return this.headers;
    }
}
