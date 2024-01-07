import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  Result,
  SPLDTO,
  StopPointLineCorrelationListResult,
  StopPointLineCorrelationResult
} from "./models/public-transport-api";
import {catchError, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ServiceHelpers} from "../helpers/service-helpers";

@Injectable({
  providedIn: 'root'
})
export class SplService {
  private readonly splEndpoint: string = 'SPL';

  constructor(private httpClient: HttpClient) {
  }

  public getAllSpls(): Observable<StopPointLineCorrelationListResult> {
    return this.httpClient.get<StopPointLineCorrelationListResult>(environment.apiUrl + this.splEndpoint)
      .pipe(catchError(ServiceHelpers.handleError));
  }

  public addSpl(splDto: SPLDTO): Observable<StopPointLineCorrelationResult> {
    return this.httpClient.post<StopPointLineCorrelationResult>(environment.apiUrl + this.splEndpoint, splDto)
      .pipe(catchError(ServiceHelpers.handleError));
  }

  public deleteSpl(id: number): Observable<Result> {
    return this.httpClient.delete<Result>(`${environment.apiUrl}${this.splEndpoint}`,
      {params: new HttpParams().set('id', id)})
      .pipe(catchError(ServiceHelpers.handleError));
  }

  public updateSpl(id: number, splDto: SPLDTO): Observable<StopPointLineCorrelationResult> {
    return this.httpClient.patch<StopPointLineCorrelationResult>(`${environment.apiUrl}${this.splEndpoint}`, splDto,
      {params: new HttpParams().set('id', id)})
      .pipe(catchError(ServiceHelpers.handleError));
  }
}
