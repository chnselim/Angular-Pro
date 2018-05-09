import {HttpHeaders} from '@angular/common/http';

export class ResponseModel<T> {
    constructor(private body: T, private headers: HttpHeaders, private status_code: number) {
    }

    getBody(): T {
        return this.body;
    }

    getHeaders(): HttpHeaders {
        return this.headers;
    }

    getStatusCode(): number {
        return this.status_code;
    }
}
