# Angular Authentication with JWT

## Setup client-side

Install angular jwt dependency

    $ npm install @auth0/angular-jwt --save
  
Create auth.service.ts

    $ ng generate service services/auth/auth

This will create `services/auth/auth.service.ts` file

```typescript
// services/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { retryWithBackoff } from '../http/retryWithBackoff';
import { AppConfig } from './../../app.config';
import { User } from './../../shared/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config: any;
  currentUser: User;
  jwtHelper = new JwtHelperService();
  private serviceUrl = "";   // autho in root /app/
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


  constructor(
    config: AppConfig,
    private _http: HttpClient,
    public router: Router
  ) {
    this.config = config.getConfig();
    this.loadTokens();
  }

  /**
   * loads auth tokens from localStorage
   */
  loadTokens() {
    // Check if there is a profile saved in local storage
    this.currentUser = localStorage.getItem('profile') != null ? User.fromJson(localStorage.getItem('profile')) : null;
    this.config.token = localStorage.getItem('id_token');
  }

  /**
   * return auth token or ''
   */
  getToken():string {
    return this.config.token;
  }

  public authenticated():boolean {
    // Check if there's an unexpired JWT
    // console.log("config.token: ", this.config.token);
    // console.log("isTokenExpired: ", this.jwtHelper.isTokenExpired(this.config.token));

    return !this.jwtHelper.isTokenExpired(this.config.token); // Returns true/false
    // return true; // Returns true/false
  }

  /**
   * Check if current user has role
   * @param [roles] array of string names of roles
   */
  checkRole(roles: string[], user?: User): boolean {
    if (this.config.token) {
      let user_roles = this.jwtHelper.decodeToken(this.config.token).roles

      for (const role of roles) {
        if (user_roles && user_roles.indexOf(role) >= 0) {
          // role found
          return true;
        }
      }
    }
    // not found
    return false;
  }

  /**
   * Calls login service, if succesful, loads and stores sessions values
   * @param username
   * @param password
   */
  login(username: string, password: string): Observable<any> {
    console.log("auth service login...");

    return this._http.post<any>(
      this.serviceUrl + "oauth",
      JSON.stringify({
        username: username,
        password: password,
        grant_type: "password"
      }),
      { headers: this.headers }).pipe(
        retryWithBackoff(1000, 3),
        tap(res => this.setSession(res)),
        catchError(this.handleErrors),
        shareReplay()
      );
  }

  private setSession(authResult: any) {
    // console.log("authResult: " + JSON.stringify(authResult));
    console.log("success: " + authResult.success);
    if (authResult.success) {
      console.log("Authentication SUCCESS!");
      localStorage.setItem('id_token', authResult.id_token);
      localStorage.setItem('profile', JSON.stringify(authResult.user));
      this.currentUser = User.fromJson(authResult.user);
      this.config.token = authResult.id_token;
      this.config.sid = "";
    }
  }

  private getDecodedToken() {
    let token = localStorage.getItem('id_token');
    return this.jwtHelper.decodeToken(token);
  }

  /**
   * RefreshTokens from server, user must be logged in
   */
  public refreshTokens() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log("auth service get tokens...");

    return this._http.get<any>(
      this.serviceUrl + "current_oauth",
      { headers: headers }).pipe(
        retryWithBackoff(1000, 3),
        tap(res => this.setSession(res)),
        catchError(this.handleErrors),
        shareReplay()
      );
  }

  public logout() {
    this.config.token = "";
    this.config.sid = "";

    // null user
    this.currentUser = null;

    // Unschedule the token refresh
    return Promise.all(
      [
        localStorage.removeItem('profile'),
        localStorage.removeItem('id_token'),
        localStorage.removeItem('refresh_token'),
        // sid: session id for anonymous user
        localStorage.removeItem('sid'),
      ]);
  }

  public getNewJwt() {
    // Get a new JWT using the refresh token saved
    // in local storage
    let refreshToken = localStorage.getItem('refresh_token');
    localStorage.setItem('id_token', refreshToken);
  }

  private handleErrors(error: HttpResponse<any>) {
    console.error("Error: " + JSON.stringify(error));
    return Observable.throw(error);
  }

}
```

Create a HTTP Interceptor to handle authentication token

```typescript
// services/auth/token.interceptor.ts
// ref: https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.authenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }

      });
    }

    return next.handle(request);
  }
}

```

Add `AuthService` and `TokenInterceptor` to app.modules.ts

```typescript
...
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
...
import { TokenInterceptor } from './services/auth/token.interceptor';
import { AuthService } from './services/auth/auth.service';
...

@NgModule({
  declarations : [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      pageData: pageDataReducer,
      appSettings: appSettingsReducer
    }),
    RoutingModule,
    LayoutsModule,
    PagesModule
  ],
  providers: [
    AuthService,
    AppConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

```

## Setup server-side

Using Turbogears

Install JWT library dependency

    $ pip install PyJWT
    
On auth controller

```python
@expose('json')
@with_json_params
def oauth(self, *args, **kw):
    headers = request.headers
    for key in headers.keys():
        log.debug("m request headers['%s']: %s", key, headers.get(key))
    log.debug("m oauth args: %s", args)
    log.debug("m oauth kw: %s", kw)
    log.debug("m oauth body: %s", request.body)

    username = kw.get('username')
    password = kw.get('password')
    resp = dict(
        id_token=None,
        success=False)

    user = model.User.by_user_name(username)

    if user:
        if user.validate_password(password):
            # success
            log.debug("login success")
            user.last_login_date = dt.datetime.now()
            resp['id_token'] = self.jwt.createToken(user).decode('utf-8')
            resp['success'] = True
            resp['user'] = user.to_json
            # login on turbogears
            force_user(username)
        else:
            log.debug("login error")
            # fail, wrong password
            resp['success'] = False

    # log.debug("oauth resp: %s", resp)
    return resp

```
