import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIservice {
  constructor(private httpclient: HttpClient) {}

  public get<T>(
    api: string,
    params: any,
    idTocken?: string | null
  ): Promise<T> {
    const url =
      environment.backend.baseURL + ':' + environment.backend.port + api;

    return firstValueFrom(
      this.httpclient
        .get<T>(url, {
          headers: {
            Authorization: idTocken ? idTocken : '',
          },
          params: params,
        })
        .pipe(
          catchError((err) => {
            throw Error(err.message);
          })
        )
    );
  }

  public post<T>(api: string, body: T, idTocken?: string): Promise<any> {
    const url =
      environment.backend.baseURL + ':' + environment.backend.port + api;

    return firstValueFrom(
      this.httpclient
        .post<T>(url, body, {
          headers: {
            Authorization: idTocken ? idTocken : '',
          },
        })
        .pipe(
          catchError((err) => {
            throw Error(`${err.message}`);
          })
        )
    );
  }
  public postBlob<T>(api: string, body: T, idTocken?: string): Promise<Blob> {
    const url =
      environment.backend.baseURL + ':' + environment.backend.port + api;

    return firstValueFrom(
      this.httpclient
        .post(url, body, {
          headers: {
            Authorization: idTocken ? idTocken : '',
          },
          responseType: 'blob',
        })
        .pipe(
          catchError((err) => {
            console.error('API error', err);
            throw Error(`${err.message}`);
          })
        )
    );
  }

  public delete(api: string, params: any, idTocken: string | null) {
    const url =
      environment.backend.baseURL + ':' + environment.backend.port + api;

    return firstValueFrom(
      this.httpclient
        .delete(url, {
          headers: {
            Authorization: idTocken ? idTocken : '',
          },
          params: params,
        })
        .pipe(
          catchError((err) => {
            console.error('API error', err);
            throw Error(`${err.message}`);
          })
        )
    );
  }
}
