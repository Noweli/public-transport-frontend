import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LineDTO, LineListResult, LineResult, Result} from "./models/public-transport-api";
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
      environment.apiUrl + this.LineEndpointPrefix + '/getall'
    ).pipe(catchError(this.handleError));
  }

  public getSingleLine(id: number): Observable<LineResult> {
    return this.httpClient.get<LineResult>(
      `${environment.apiUrl}${this.LineEndpointPrefix}/${id}`
    ).pipe(catchError(this.handleError));
  }

  public addLine(lineDto: LineDTO): Observable<Result> {
    return this.httpClient.post<Result>(
      environment.apiUrl + this.LineEndpointPrefix,
      lineDto
    ).pipe(catchError(this.handleError))
  }

  public deleteLine(id: number): Observable<Result> {
    return this.httpClient.delete<Result>(
      `${environment.apiUrl}${this.LineEndpointPrefix}/${id}`
    ).pipe(catchError(this.handleError));
  }

  public updateLine(id: number, lineDto: LineDTO): Observable<LineResult> {
    return this.httpClient.patch<LineResult>(
      `${environment.apiUrl}${this.LineEndpointPrefix}/${id}`,
      lineDto
    ).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.log(errorResponse);
    if (!errorResponse.error) {
      return throwError(() => new Error('Unexpected error occurred.'));
    }

    return throwError(() => new Error(errorResponse.error.message));
  }
}
