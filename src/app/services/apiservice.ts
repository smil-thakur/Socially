import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, finalize, firstValueFrom, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIservice {
  constructor(private httpclient: HttpClient) {}

  public get<T>(
    api: string,
    idTocken?: string,
    onStart?: () => void,
    onComplete?: () => void,
    onError?: () => void
  ): Promise<T> {
    const url =
      environment.backend.baseURL + ':' + environment.backend.port + api;
    if (onStart) {
      onStart();
    }
    return firstValueFrom(
      this.httpclient
        .get<T>(url, {
          headers: {
            Authorization: idTocken ? idTocken : '',
          },
        })
        .pipe(
          catchError((err) => {
            if (onError) {
              onError();
            }
            throw Error(`api post to url ${url} failed ${err}`);
          }),
          finalize(() => {
            if (onComplete) {
              onComplete();
            }
          })
        )
    );
  }

  public post<T>(
    api: string,
    body: T,
    idTocken?: string,
    onStart?: () => void,
    onComplete?: () => void,
    onError?: () => void
  ): Promise<any> {
    const url =
      environment.backend.baseURL + ':' + environment.backend.port + api;
    if (onStart) {
      onStart();
    }
    return firstValueFrom(
      this.httpclient
        .post<T>(url, body, {
          headers: {
            Authorization: idTocken ? idTocken : '',
          },
        })
        .pipe(
          catchError((err) => {
            if (onError) {
              onError();
            }
            throw Error(`${api} is not reachable!`);
          }),
          finalize(() => {
            if (onComplete) {
              onComplete();
            }
          })
        )
    );
  }
}
