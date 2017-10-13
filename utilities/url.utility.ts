import {URLSearchParams} from '@angular/http';

export class UrlUtility {
    public static buildURLSearchParams(data: Map<string, string>): URLSearchParams {
        var params = new URLSearchParams();
        data.forEach((value, key) => {
            params.append(key, value);
        });
        return params;
    }
}
