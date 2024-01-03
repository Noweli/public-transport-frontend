import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-schedule-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './schedule-add.component.html',
  styleUrl: './schedule-add.component.scss'
})
export class ScheduleAddComponent {
  @ViewChild('scheduleForm') scheduleForm: NgForm = null!;

  constructor() {
    // this.scheduleForm.valu
  }
}
