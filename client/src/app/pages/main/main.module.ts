import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CallHintComponent } from './call-hint/call-hint.component';
import { EndGameModalComponent } from './end-game-modal/end-game-modal.component';
import { HallHintComponent } from './hall-hint/hall-hint.component';
import { MainComponent } from './main.component';
import { MainService } from './main.service';

@NgModule({
  declarations: [
    MainComponent,
    CallHintComponent,
    HallHintComponent,
    EndGameModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [MainService],
})
export class MainModule {}
