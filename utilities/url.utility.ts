import {URLSearchParams} from '@angular/http';
import {HttpParams} from '@angular/common/http';

export class UrlUtility {
    public static buildURLSearchParams(data: Map<string, string>): HttpParams {
        var params = new HttpParams();
        if (data) {
            data.forEach((value, key) => {
                params = params.append(key, value);
            });
        }
        return params;
    }
}
