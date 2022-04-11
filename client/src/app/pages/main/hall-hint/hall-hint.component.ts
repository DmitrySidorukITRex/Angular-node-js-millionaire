import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hall-hint',
  templateUrl: './hall-hint.component.html',
  styleUrls: ['./hall-hint.component.scss'],
})
export class HallHintComponent implements OnInit {
  public chart: { letter: string; count: number }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { answers: string[]; rightAnswer: string }
  ) {}

  ngOnInit(): void {
    this.setChart(this.data);
  }

  private setChart(data: { answers: string[]; rightAnswer: string }): void {
    const rightAnswerIndex = data.answers.indexOf(data.rightAnswer);
    let count = 100;
    for (let i = 0; i < data.answers.length; i++) {
      if (i !== data.answers.length - 1) {
        const random =
          i === rightAnswerIndex
            ? this.getRandomInt(50, 80)
            : this.getRandomInt(0, 10);
        count -= random;
        this.chart.push({ letter: this.getLetter(i), count: random });
      } else {
        this.chart.push({ letter: this.getLetter(i), count: count });
      }
    }
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getLetter(index: number): string {
    switch (index) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      default:
        return '';
    }
  }
}
