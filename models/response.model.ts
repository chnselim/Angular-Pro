import {Headers} from '@angular/http';

export class ResponseModel<T> {
    constructor(private body: T, private headers: Headers, private status_code: number, private url: string) {
    }

    getBody(): T {
        return this.body;
    }

    getHeaders(): Headers {
        return this.headers;
    }

    getStatusCode(): number {
        return this.status_code;
    }

    getUrl(): string {
        return this.url;
    }
}
