import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Results } from './main.constants';
import { IRound } from './main.interface';
import { MainService } from './main.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CallHintComponent } from './call-hint/call-hint.component';
import { HallHintComponent } from './hall-hint/hall-hint.component';
import { EndGameModalComponent } from './end-game-modal/end-game-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public rounds: IRound[];
  public currentRoundIndex = 0;
  public currentAnswer: string;
  public rightAnswer: string;
  public results = Results;
  public isHalfHintActive: boolean;
  public isHalfHintActivated: boolean;
  public isHallHintActive: boolean;
  public isHallHintActivated: boolean;
  public isCallHintActive: boolean;
  public isCallHintActivated: boolean;

  private gameSound = new Audio('../../../assets/sounds/full-game.mp3');

  constructor(
    private readonly mainService: MainService,
    private readonly dialog: MatDialog
  ) {
    this.gameSound.load();
  }

  ngOnInit(): void {
    this.getData();
  }

  public getLetter(index: number): string {
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

  public isNonBurnable(round: number): boolean {
    switch (round) {
      case 5:
      case 10:
      case 15:
        return true;
      default:
        return false;
    }
  }

  public onAnswer(answer: string): void {
    this.currentAnswer = answer;
    const rightAnswer = this.rounds[this.currentRoundIndex].rightAnswer;
    setTimeout(() => {
      this.gameSound.pause();
      if (rightAnswer === answer) {
        this.rightAnswer = rightAnswer;
        this.currentAnswer = '';
        this.loadSound('../../../assets/sounds/right-answer.mp3');
        setTimeout(() => {
          if (this.currentRoundIndex === this.rounds.length - 1) {
            this.openEndGameModal(true);
          } else {
            this.currentRoundIndex++;
            this.resetHints();
            this.gameSound.play();
          }
        }, 2000);
      } else {
        this.rightAnswer = rightAnswer;
        this.loadSound('../../../assets/sounds/wrong-answer.mp3');
        setTimeout(() => {
          this.openEndGameModal(false);
        }, 2000);
      }
    }, 2000);
  }

  public onHalfHint(): void {
    this.loadSound('../../../assets/sounds/select-hint.mp3');
    this.isHalfHintActive = true;
    this.isHalfHintActivated = true;
    const currentRound = this.rounds[this.currentRoundIndex];
    const rightAnswer = currentRound.rightAnswer;
    const wrongAnswers = currentRound.answers.filter((x) => x !== rightAnswer);
    const randomWrongAnswer =
      wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    const answers = [rightAnswer, randomWrongAnswer];
    const elements = document.getElementsByClassName('answers-item');
    for (let i = 0; i < elements.length; i++) {
      const answer = elements[i].innerHTML.slice(3).trim();
      if (!answers.includes(answer)) {
        elements[i].className = elements[i].className + ' hide';
      }
    }
  }

  public onHallHint(): void {
    this.loadSound('../../../assets/sounds/select-hint.mp3');
    this.isHallHintActivated = true;
    this.isHallHintActive = true;
    const currentRound = this.rounds[this.currentRoundIndex];
    const dialogRef = this.dialog.open(HallHintComponent, {
      width: '600px',
      data: {
        answers: currentRound.answers,
        rightAnswer: currentRound.rightAnswer,
      },
    });
  }

  public onCallHint(): void {
    this.loadSound('../../../assets/sounds/select-hint.mp3');
    this.isCallHintActivated = true;
    this.isCallHintActive = true;
    const currentRound = this.rounds[this.currentRoundIndex];
    const rightAnswerLetter = this.getLetter(
      currentRound.answers.indexOf(currentRound.rightAnswer)
    );
    const dialogRef = this.dialog.open(CallHintComponent, {
      width: '600px',
      data: {
        rightAnswer: rightAnswerLetter,
      },
    });
  }

  private getData(): void {
    this.mainService
      .getRounds()
      .pipe(untilDestroyed(this))
      .subscribe((rounds) => {
        this.rounds = rounds;
        this.gameSound.play();
      });
  }

  private resetHints(): void {
    this.isHalfHintActive = false;
    this.isCallHintActive = false;
    this.isHallHintActive = false;
  }

  private resetGame(): void {
    this.resetHints();
    this.isHalfHintActivated = false;
    this.isCallHintActivated = false;
    this.isHallHintActivated = false;
    this.rightAnswer = '';
    this.currentAnswer = '';
    this.gameSound = new Audio('../../../assets/sounds/full-game.mp3');
    this.gameSound.load();
    this.gameSound.play();
  }

  private openEndGameModal(isWon: boolean): void {
    const scores = this.getScores(isWon);
    const dialogRef = this.dialog.open(EndGameModalComponent, {
      width: '600px',
      data: {
        isWon,
        scores,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.currentRoundIndex = 0;
        this.resetGame();
      });
  }

  private getScores(isWon: boolean): number {
    if (this.currentRoundIndex < 5) return 0;
    else if (this.currentRoundIndex >= 5 && this.currentRoundIndex < 10)
      return 1000;
    else if (
      !isWon &&
      this.currentRoundIndex >= 10 &&
      this.currentRoundIndex < 15
    )
      return 32000;
    else return 1000000;
  }

  private loadSound(src: string): void {
    const sound = new Audio();
    sound.src = src;
    sound.load();
    sound.play();
  }
}
