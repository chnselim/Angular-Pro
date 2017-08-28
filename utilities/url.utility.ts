import {URLSearchParams} from '@angular/http';

export class UrlUtility {
    public static buildURLSearchParams(data: Map<string, string>): URLSearchParams {
        const response: string[] = [];
        data.forEach((key, value) => {
            response.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        });
        return new URLSearchParams(response.join('&'));
    }
}
