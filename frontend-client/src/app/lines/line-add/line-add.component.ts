import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {Location} from "@angular/common";
import {LineDTO, LineResult} from "../../services/models/public-transport-api";
import {LineService} from "../../services/line.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-line-add',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './line-add.component.html',
  styleUrl: './line-add.component.scss'
})
export class LineAddComponent implements OnInit {
  private editId: number = null!;
  protected isEditMode: boolean = false;

  @ViewChild('lineForm') lineForm: NgForm = null!;

  constructor(private location: Location, private lineService: LineService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.editId = +params['id'];
      this.isEditMode = params['id'] != null;
      this.initializeForm();
    });
  }

  protected handleSubmit(lineForm: NgForm) {
    if (!this.isEditMode) {
      this.addLine(lineForm);
      return;
    }

    this.updateLine(lineForm);
  }

  protected goBack(): void {
    this.location.back();
  }

  private addLine(lineForm: NgForm): void {
    if (!lineForm.valid) {
      return;
    }

    let lineDto: LineDTO = {
      name: lineForm.value.name,
      identifier: lineForm.value.identifier
    }

    this.lineService.addLine(lineDto).subscribe({
      complete: () => {
        this.snackBar.open('Successfully added line.', 'OK', {duration: 3000});
        this.goBack();
      },
      error: err => this.snackBar.open('Could not add line. ' + err, 'OK')
    })
  }

  private updateLine(lineForm: NgForm): void {
    this.lineService.updateLine(this.editId, lineForm.value).subscribe({
      complete: () => {
        this.snackBar.open('Successfully updated line.', 'OK', {duration: 3000});
        this.goBack();
      },
      error: err => this.snackBar.open('Could not update line. ' + err, 'OK')
    })
  }

  private initializeForm(): void {
    if (!this.isEditMode) {
      return;
    }

    this.lineService.getSingleLine(this.editId).subscribe({
      next: (lineResult: LineResult) => {
        this.lineForm.setValue({
          name: lineResult.data?.name,
          identifier: lineResult.data?.identifier
        });
      },
      error: err => this.snackBar.open('Could not retrieve line. ' + err, 'OK')
    });
  }
}
