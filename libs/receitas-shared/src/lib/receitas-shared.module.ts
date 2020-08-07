import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarReceitaComponent } from './cadastrar-receita/cadastrar-receita.component';
import { ListarReceitasComponent } from './listar-receitas/listar-receitas.component';
import { AngularMaterialModule } from '@finances-app/angular-material';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [CadastrarReceitaComponent, ListarReceitasComponent],
  exports: [CadastrarReceitaComponent, ListarReceitasComponent],
})
export class ReceitasSharedModule {}
