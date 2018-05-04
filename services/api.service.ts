import {HttpClient, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http';
import {ResponseModel} from '../models/response.model';
import {UrlUtility} from '../utilities/url.utility';
import {isNullOrUndefined} from 'util';
import 'rxjs/add/operator/toPromise';

export abstract class APIServiceBase {

    constructor(protected http: HttpClient) {
    }

    public httpHead<T>(uri: string, query_parameters?: HttpParams): Promise<ResponseModel<T>> {
        return this.doApiCall('HEAD', uri, query_parameters);
    }

    public httpGet<T>(uri: string, query_parameters?: HttpParams): Promise<ResponseModel<T>> {
        return this.doApiCall('GET', uri, query_parameters);
    }

    public httpPost<T>(uri: string, body: any, query_parameters?: HttpParams): Promise<ResponseModel<T>> {
        return this.doApiCall('POST', uri, query_parameters, body);
    }

    public httpPatch<T>(uri: string, body: any, query_parameters?: HttpParams): Promise<ResponseModel<T>> {
        return this.doApiCall('PATCH', uri, query_parameters, body);
    }

    public httpPut<T>(uri: string, body: any, query_parameters?: HttpParams): Promise<ResponseModel<T>> {
        return this.doApiCall('PUT', uri, query_parameters, body);
    }

    public httpDelete<T>(uri: string, query_parameters?: HttpParams): Promise<ResponseModel<T>> {
        return this.doApiCall('DELETE', uri, query_parameters);
    }

    protected doApiCall<T>(method: string,
                           uri: string,
                           query_parameters?: HttpParams,
                           body?: any): Promise<ResponseModel<T>> {
        const request_options = this.generateRequestOptions(method, uri, query_parameters, body);
        return this.http
            .request(request_options.method, request_options.url, request_options)
            .toPromise()
            .then(response => {

                const response_text: string = response.text();
                if (response_text.length === 0) {
                    return new ResponseModel(null, response.headers, response.status);
                }

                const response_data = response.json().data;
                return new ResponseModel(response_data as T, response.headers, response.status);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    protected getHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    protected abstract getBaseUri(): string;

    private generateRequestOptions(method: string,
                                   uri: string,
                                   query_parameters?: HttpParams,
                                   body?: any): HttpRequest<object> {
        const request_options = new HttpRequest<object>(method, this.getBaseUri() + uri, body || null,
            {params: query_parameters, headers: this.getHeaders()});

        // {params: UrlUtility.buildURLSearchParams(query_parameters), headers: this.getHeaders()}

        return request_options;
    }
}
