import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

export class ServiceHelpers {
  public static handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.log(errorResponse);
    if (!errorResponse.error) {
      return throwError(() => new Error('Unexpected error occurred.'));
    }

    return throwError(() => new Error(errorResponse.error.message));
  }
}
