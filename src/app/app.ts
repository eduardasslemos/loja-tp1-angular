import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { QuantidadeControle } from './shared/quantidade-controle/quantidade-controle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, QuantidadeControle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('loja-tp1-angular');

  sobre?: string;
  
  receberSobre(msg: string): void{
    this.sobre = msg;
  }
}
