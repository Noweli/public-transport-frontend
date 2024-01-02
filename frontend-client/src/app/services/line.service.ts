import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LineListResult} from "./models/public-transport-api";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private readonly LineEndpointPrefix: string = 'Line';

  constructor(private httpClient: HttpClient) {
  }

  public getAllLines(): Observable<LineListResult> {
    return this.httpClient.get<LineListResult>(
      environment.apiUrl + this.LineEndpointPrefix + 'getall'
    ).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error('Unexpected error occurred.'));
    }

    return throwError(() => new Error(errorResponse.error.error.message));
  }
}
