import {URLSearchParams} from '@angular/http';
import {HttpParams} from '@angular/common/http';

export class UrlUtility {
    public static buildURLSearchParams(data: HttpParams): URLSearchParams {
        let params = new URLSearchParams();
        for (let param in data) {
            params.append(param, data[param]);
        }
        return params;
    }
}
