import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Result, ScheduleEntryDTO, ScheduleEntryListResult, ScheduleEntryResult} from "./models/public-transport-api";
import {environment} from "../../environments/environment";
import {ServiceHelpers} from "../helpers/service-helpers";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly scheduleEndpoint: string = 'Schedule';

  constructor(private httpClient: HttpClient) {
  }

  public getAllSchedules(): Observable<ScheduleEntryListResult> {
    return this.httpClient.get<ScheduleEntryListResult>(
      `${environment.apiUrl}${this.scheduleEndpoint}`
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public getScheduleById(id: number): Observable<ScheduleEntryResult> {
    return this.httpClient.get<ScheduleEntryResult>(
      `${environment.apiUrl}${this.scheduleEndpoint}/${id}`
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public addSchedule(scheduleDto: ScheduleEntryDTO): Observable<ScheduleEntryResult> {
    return this.httpClient.post<ScheduleEntryResult>(
      `${environment.apiUrl}${this.scheduleEndpoint}`,
      scheduleDto
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public attachScheduleToSpl(scheduleId: number, splId: number) {
    return this.httpClient.patch<ScheduleEntryResult>(
      `${environment.apiUrl}${this.scheduleEndpoint}/${scheduleId}`,
      null,
      {params: new HttpParams().set('splId', splId)}
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public deleteSchedule(id: number): Observable<Result> {
    return this.httpClient.delete<Result>(
      `${environment.apiUrl}${this.scheduleEndpoint}`,
      {params: new HttpParams().set('id', id)}
    ).pipe(catchError(ServiceHelpers.handleError));
  }

  public updateSchedule(id: number, scheduleDto: ScheduleEntryDTO): Observable<ScheduleEntryResult> {
    return this.httpClient.patch<ScheduleEntryResult>(
      `${environment.apiUrl}${this.scheduleEndpoint}`, scheduleDto,
      {params: new HttpParams().set('id', id)}
    ).pipe(catchError(ServiceHelpers.handleError));
  }
}
