import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {

  private userObs$: BehaviorSubject<any> = new BehaviorSubject(null);

  getUserObs(): Observable<any> {
    return this.userObs$.asObservable();
  }

  setUserObs(user: any) {
    this.userObs$.next(user);
  }
}
