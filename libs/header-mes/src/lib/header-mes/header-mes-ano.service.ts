import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class HeaderMesAnoService {
  private mesAno = new BehaviorSubject<any>({ mes: null, ano: null });

  constructor() {}

  setMesAno(mes: any): void {
    this.mesAno.next(mes);
  }

  getMesAno(): Observable<any> {
    return this.mesAno.asObservable();
  }
}
