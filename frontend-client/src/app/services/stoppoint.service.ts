import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {StopPointListResult} from "./models/public-transport-api";
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
}
