import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ResponseModel} from '../models/response.model';
import {UrlUtility} from '../utilities/url.utility';
import 'rxjs/add/operator/toPromise';

export abstract class APIServiceBase {

    constructor(protected http: HttpClient) {
    }

    public httpHead<T>(uri: string, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall('HEAD', uri, query_parameters);
    }

    public httpGet<T>(uri: string, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall('GET', uri, query_parameters);
    }

    public httpPost<T>(uri: string, body: any, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall('POST', uri, query_parameters, body);
    }

    public httpPatch<T>(uri: string, body: any, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall('PATCH', uri, query_parameters, body);
    }

    public httpPut<T>(uri: string, body: any, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall('PUT', uri, query_parameters, body);
    }

    public httpDelete<T>(uri: string, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall('DELETE', uri, query_parameters);
    }

    protected doApiCall<T>(method: string,
                           uri: string,
                           query_parameters?: Map<string, string>,
                           body?: any): Promise<ResponseModel<T>> {
        const request_options = this.generateRequestOptions(method, uri, query_parameters, body);
        return this.http
            .request(method, request_options.url, {
                observe: 'response',
                headers: request_options.headers,
                body: request_options.body,
                params: request_options.params
            })
            .toPromise()
            .then(response => {
                const response_data = response.body['data'];
                return new ResponseModel(response_data as T, response.headers, response.status);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    protected getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }

    protected abstract getBaseUri(): string;

    private generateRequestOptions(method: string,
                                   uri: string,
                                   query_parameters?: Map<string, string>,
                                   body?: any): HttpRequest<any> {
        const url: string = this.getBaseUri() + uri;
        return new HttpRequest(method, url, body, {
            headers: this.getHeaders(),
            params: UrlUtility.buildURLSearchParams(query_parameters)
        });
    }
}
