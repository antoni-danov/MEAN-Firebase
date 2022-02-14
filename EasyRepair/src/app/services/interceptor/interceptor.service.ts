import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token!: string;

  constructor(
    private service: CookieService,
    private authService: AuthService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.service.get('JWT');

    if (this.token) {
      const reqToken = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });

      return next.handle(reqToken);
    }

    return next.handle(req);
  }
}
