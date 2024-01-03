import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Result, StopPointDTO, StopPointListResult, StopPointResult} from "./models/public-transport-api";
import {environment} from "../../environments/environment";
import {ServiceHelpers} from "../helpers/service-helpers";

@Injectable({
  providedIn: 'root'
})
export class StopPointService {
  private readonly StopPointEndpoint: string = 'StopPoint';

  constructor(private httpClient: HttpClient) {
  }

  public getAllStopPoints(): Observable<StopPointListResult> {
    return this.httpClient.get<StopPointListResult>(
      `${environment.apiUrl}${this.StopPointEndpoint}`
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public getStopPoint(stopPointId: number): Observable<StopPointResult> {
    return this.httpClient.get<StopPointResult>(
      `${environment.apiUrl}${this.StopPointEndpoint}/${stopPointId}`
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public addStopPoint(stopPointDto: StopPointDTO): Observable<StopPointResult> {
    return this.httpClient.post<StopPointResult>(
      `${environment.apiUrl}${this.StopPointEndpoint}`,
      stopPointDto
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public deleteStopPoint(stopPointId: number): Observable<Result> {
    return this.httpClient.delete<Result>(
      `${environment.apiUrl}${this.StopPointEndpoint}`,
      {params: new HttpParams().set('id', stopPointId)}
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public updateStopPoint(stopPointId: number, stopPointDto: StopPointDTO): Observable<StopPointResult> {
    return this.httpClient.patch<StopPointResult>(
      `${environment.apiUrl}${this.StopPointEndpoint}`, stopPointDto,
      {params: new HttpParams().set('id', stopPointId)}
    ).pipe(catchError(ServiceHelpers.handleError));
  }
}
