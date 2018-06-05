import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "./http.interceptor";
import { DialogResultErrorService } from "./dialog-result-error/dialog-result-error.service";
import { Router } from '@angular/router';
import { Globals } from './globals';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, notifyService: DialogResultErrorService, router: Router, globals: Globals): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, notifyService, router, globals);
}