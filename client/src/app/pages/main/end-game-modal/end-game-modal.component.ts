import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-end-game-modal',
  templateUrl: './end-game-modal.component.html',
  styleUrls: ['./end-game-modal.component.scss'],
})
export class EndGameModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { isWon: boolean; scores: number },
    private dialogRef: MatDialogRef<EndGameModalComponent>
  ) {}

  ngOnInit(): void {
    this.startAudio();
  }

  public startGame(): void {
    this.dialogRef.close(true);
  }

  private startAudio(): void {
    const src = this.data.isWon
      ? '../../../../assets/sounds/congrats.mp3'
      : '../../../../assets/sounds/sorry.mp3';
    const audio = new Audio(src);
    audio.load();
    audio.play();
  }
}
