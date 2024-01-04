import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule, Location} from "@angular/common";
import {ScheduleHelper} from "../../helpers/schedule-helper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {ScheduleEntryDTO} from "../../services/models/public-transport-api";
import {ScheduleService} from "../../services/schedule.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-schedule-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './schedule-add.component.html',
  styleUrl: './schedule-add.component.scss'
})
export class ScheduleAddComponent implements OnInit {
  private isEditMode: boolean = false;
  private id: number = null!;
  protected scheduleForm: FormGroup = null!;
  protected readonly ScheduleHelper = ScheduleHelper;

  constructor(private scheduleService: ScheduleService, private snackBar: MatSnackBar, private location: Location) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.isEditMode) {
      return;
    }

    this.addSchedule();
  }

  private initializeForm() {
    this.scheduleForm = new FormGroup({
      isRecurring: new FormControl(false),
      recurringDays: this.getDaysFormArray(),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });
  }

  private getDaysFormArray(): FormArray {
    let formArray: FormArray = new FormArray<any>([]);
    for (let i = 0; i < ScheduleHelper.dayMap.size; i++) {
      formArray.push(new FormControl(false))
    }

    return formArray;
  }

  private addSchedule(): void {
    if (!this.scheduleForm.valid) {
      return;
    }

    const formValue = this.scheduleForm.value;

    let scheduleDto: ScheduleEntryDTO = {
      isRecurring: formValue.isRecurring,
      recurringDays: this.convertDaysCheckboxList(formValue.recurringDays),
      dateTime: this.getDateTime(formValue.date, formValue.time)
    }

    console.log(scheduleDto);

    this.scheduleService.addSchedule(scheduleDto).subscribe({
        complete: () => {
          this.snackBar.open('Schedule added successfully', 'OK', {duration: 3000});
          this.goBack();
        },
        error: (error) => this.snackBar.open('Failed to add schedule. ' + error, 'OK')
      }
    );
  }

  private convertDaysCheckboxList(input: boolean[]): string {
    return input.map((value: boolean, index: number) => {
      if (value) {
        return index.toString();
      }

      return null;
    }).filter(value => value !== null).join(',');
  }

  private getDateTime(date: Date, time: string): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}T${time}`;
  }

  protected goBack() {
    this.location.back();
  }
}
