import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LineDTO, LineListResult, LineResult, Result} from "./models/public-transport-api";
import {environment} from "../../environments/environment";
import {catchError, Observable} from "rxjs";
import {ServiceHelpers} from "../helpers/service-helpers";

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
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public getSingleLine(id: number): Observable<LineResult> {
    return this.httpClient.get<LineResult>(
      `${environment.apiUrl}${this.LineEndpointPrefix}/${id}`
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public addLine(lineDto: LineDTO): Observable<Result> {
    return this.httpClient.post<Result>(
      environment.apiUrl + this.LineEndpointPrefix,
      lineDto
    ).pipe(catchError(ServiceHelpers.handleError))
  }

  public deleteLine(id: number): Observable<Result> {
    return this.httpClient.delete<Result>(
      `${environment.apiUrl}${this.LineEndpointPrefix}/${id}`
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public updateLine(id: number, lineDto: LineDTO): Observable<LineResult> {
    return this.httpClient.patch<LineResult>(
      `${environment.apiUrl}${this.LineEndpointPrefix}/${id}`,
      lineDto
    ).pipe(catchError(ServiceHelpers.handleError));
  }
}
