
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SecurityService } from "./security.service";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private SecurityService: SecurityService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenSecurityService = this.SecurityService.getToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+ tokenSecurityService),
    });

    return next.handle(request);
  }
}
