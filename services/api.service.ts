import {Http, RequestMethod, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ResponseModel} from '../models/response.model';
import {isNullOrUndefined} from 'util';
import {UrlUtility} from '../utilities/url.utility';

export abstract class APIServiceBase {

    constructor(protected http: Http) {
    }

    public httpHead<T>(uri: string, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall(RequestMethod.Head, uri, query_parameters);
    }

    public httpGet<T>(uri: string, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall(RequestMethod.Get, uri, query_parameters);
    }

    public httpPost<T>(uri: string, body: any, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall(RequestMethod.Post, uri, query_parameters, body);
    }

    public httpPatch<T>(uri: string, body: any, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall(RequestMethod.Patch, uri, query_parameters, body);
    }

    public httpPut<T>(uri: string, body: any, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall(RequestMethod.Put, uri, query_parameters, body);
    }

    public httpDelete<T>(uri: string, query_parameters?: Map<string, string>): Promise<ResponseModel<T>> {
        return this.doApiCall(RequestMethod.Delete, uri, query_parameters);
    }

    protected doApiCall<T>(method: RequestMethod,
                           uri: string,
                           query_parameters?: Map<string, string>,
                           body?: any): Promise<ResponseModel<T>> {
        const request_options = this.generateRequestOptions(method, uri, query_parameters, body);
        return this.http
            .request(request_options.url, request_options)
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

    protected getHeaders(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    protected abstract getBaseUri(): string;

    private generateRequestOptions(method: RequestMethod,
                                   uri: string,
                                   query_parameters?: Map<string, string>,
                                   body?: any/*todo*/): RequestOptions {
        const request_options = new RequestOptions();
        request_options.method = method;
        request_options.url = this.getBaseUri() + uri;
        request_options.headers = this.getHeaders();

        if (!isNullOrUndefined(body)) {
            request_options.body = JSON.stringify(body);
        }
        if (!isNullOrUndefined(query_parameters)) {
            request_options.params = UrlUtility.buildURLSearchParams(query_parameters);
        }

        return request_options;
    }
}
