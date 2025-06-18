---
title: "Angular HTTP Client"
layout: default
nav_order: 13
---
# http

ref: [Learn rxjs](https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retrywhen)

### retryWhen operator

```typescript
// ref: https://blog.angularindepth.com/retry-failed-http-requests-in-angular-f5959d486294
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';

const getErrorMessage = (maxRetry: number) =>
  `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up.`;

const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_BACKOFF = 1000;

export function retryWithBackoff(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES, backoffMs = DEFAULT_BACKOFF) {
  let retries = maxRetry;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        mergeMap(error => {
          if (retries-- > 0) {
            const backoffTime = delayMs + (maxRetry - retries) * backoffMs;
            return of(error).pipe(delay(backoffTime));
          }
          return throwError(getErrorMessage(maxRetry));
        })
      ))
    );
}
```

### using retry operator with custom strategy

```typescript
  register(user: User) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    console.log(this.serviceUrl + "register",
      JSON.stringify({
        username: user.email_address,
        name: user.display_name,
        email: user.email_address,
        password: user.password
      }));

    return this._http.post<any>(
      this.serviceUrl + "register",
      JSON.stringify({
        username: user.email_address,
        name: user.display_name,
        email: user.email_address,
        password: user.password
      }),
      { headers: headers }).pipe(
        retryWithBackoff(1000, 3),
        catchError(this.handleErrors),
        shareReplay()
      );
  }
```

### using retry operator with generic strategy

```typescript
  register(user: User) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      console.log(this.serviceUrl + "register",
        JSON.stringify({
          username: user.email_address,
          name: user.display_name,
          email: user.email_address,
          password: user.password
        }));

      return this._http.post<any>(
          this.serviceUrl + "register",
          JSON.stringify({
            username: user.email_address,
            name: user.display_name,
            email: user.email_address,
            password: user.password
          }),
          { headers: headers }).pipe(
              retryWhen((genericRetryStrategy({
                  scalingDuration: 2000,
                  excludedStatusCodes: [500]
              }))),
              catchError(this.handleErrors));
  }
```
