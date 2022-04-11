import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-call-hint',
  templateUrl: './call-hint.component.html',
  styleUrls: ['./call-hint.component.scss'],
})
export class CallHintComponent implements OnInit {
  public rightAnswer: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { rightAnswer: string }
  ) // private dialogRef: MatDialogRef<AddEditBookComponent>,
  {
    this.rightAnswer = data.rightAnswer;
  }

  ngOnInit(): void {}
}
