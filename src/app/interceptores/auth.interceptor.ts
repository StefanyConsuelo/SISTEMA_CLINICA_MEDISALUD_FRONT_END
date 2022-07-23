import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = window.localStorage.getItem("TOKEN_SIDET");
        req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken
                }
            }
        );
        return next.handle(req);
    }
}