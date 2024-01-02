/* eslint-disable */
/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Line {
  /** @format int32 */
  id?: number;
  /** @maxLength 30 */
  identifier?: string | null;
  /** @maxLength 120 */
  name?: string | null;
  splCorrelations?: StopPointLineCorrelation[] | null;
}

export interface LineDTO {
  identifier?: string | null;
  name?: string | null;
}

export interface LineListResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: Line[] | null;
}

export interface LineResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: Line;
}

export interface Result {
  isSuccess?: boolean;
  message?: string | null;
}

export interface SPLDTO {
  /** @format int32 */
  lineId?: number;
  /** @format int32 */
  stopPointId?: number;
}

export interface ScheduleEntry {
  /** @format int32 */
  id?: number;
  isRecurring?: boolean;
  /** @maxLength 15 */
  recurringDays?: string | null;
  /** @format date-time */
  dateTime?: string;
  splCorrelation?: StopPointLineCorrelation;
}

export interface ScheduleEntryDTO {
  isRecurring?: boolean;
  recurringDays?: string | null;
  /** @format date-time */
  dateTime?: string;
  /** @format int32 */
  splCorrelationId?: number | null;
}

export interface ScheduleEntryListResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: ScheduleEntry[] | null;
}

export interface ScheduleEntryResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: ScheduleEntry;
}

export interface StopPoint {
  /** @format int32 */
  id?: number;
  /** @maxLength 30 */
  lat?: string | null;
  /** @maxLength 30 */
  long?: string | null;
  /** @maxLength 30 */
  identifier?: string | null;
  /** @maxLength 120 */
  name?: string | null;
  /** @maxLength 120 */
  streetName?: string | null;
  splCorrelation?: StopPointLineCorrelation[] | null;
}

export interface StopPointDTO {
  lat?: string | null;
  long?: string | null;
  identifier?: string | null;
  name?: string | null;
  streetName?: string | null;
}

export interface StopPointLineCorrelation {
  /** @format int32 */
  id?: number;
  line?: Line;
  stopPoint?: StopPoint;
  scheduleEntries?: ScheduleEntry[] | null;
}

export interface StopPointLineCorrelationListResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: StopPointLineCorrelation[] | null;
}

export interface StopPointLineCorrelationResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: StopPointLineCorrelation;
}

export interface StopPointListResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: StopPoint[] | null;
}

export interface StopPointResult {
  isSuccess?: boolean;
  message?: string | null;
  data?: StopPoint;
}
