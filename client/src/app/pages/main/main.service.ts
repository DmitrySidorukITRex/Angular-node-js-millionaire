import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGame, IRound } from './main.interface';

@Injectable()
export class MainService {
  constructor(private readonly http: HttpClient) {}

  public getGameInfo(): Observable<IGame> {
    return this.http.get<IGame>('api/game');
  }

  public getRounds(): Observable<IRound[]> {
    return this.http.get<IRound[]>('api/round/game');
  }
}
