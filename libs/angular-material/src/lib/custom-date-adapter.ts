import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

/** Adapts the native JS Date for use with cdk-based components that work with dates. */
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  inputValue;

  parse(value: any): Date | null {

    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]);
      const date = Number(str[0]);
      const momentDate = moment(`${year}-${month}-${date}`, 'YYYY-MM-DD');
      const minDate1901 = moment('1901-01-01', 'YYYY-MM-DD');

      if (momentDate.isBefore(minDate1901)) {
        return this.invalid();
      }

      return moment(`${year}-${month}-${date}`, 'YYYY-MM-DD').toDate() as Date;
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: Object): string {
    const copyDate = new Date(Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
      date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    const copyDisplayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
    const dtf = new Intl.DateTimeFormat(this.locale, copyDisplayFormat);
    return dtf.format(copyDate).replace(/[\u200e\u200f]/g, '');
  }

}
