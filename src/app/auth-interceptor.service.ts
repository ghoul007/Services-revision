import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const updReq = req.clone({ headers: req.headers.append('auth', 'basic') });

    return next.handle(updReq);
  }
}
