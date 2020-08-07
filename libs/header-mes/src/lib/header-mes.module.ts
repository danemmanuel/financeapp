import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMesComponent } from './header-mes/header-mes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [HeaderMesComponent],
  exports: [HeaderMesComponent],
})
export class HeaderMesModule {}
