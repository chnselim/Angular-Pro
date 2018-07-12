import {HttpHeaders} from '@angular/common/http';

export class ResponseModel<T> {
    constructor(private body: T, private headers: HttpHeaders, private status_code: number, private relationships: Map<string,object>) {
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

    getRelationships(): Map<string,object> {
        return this.relationships;
    }
}
