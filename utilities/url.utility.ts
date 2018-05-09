import {HttpParams} from '@angular/common/http';

export class UrlUtility {
    public static buildURLSearchParams(data: Map<string, string>): HttpParams {
        let params = new HttpParams();
        if (data) {
            data.forEach((value, key) => {
                params = params.append(key, value);
            });
        }
        return params;
    }
}
