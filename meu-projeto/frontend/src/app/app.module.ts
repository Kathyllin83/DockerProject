import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CadastroComponent  // ✅ IMPORTANDO COMO STANDALONE
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
