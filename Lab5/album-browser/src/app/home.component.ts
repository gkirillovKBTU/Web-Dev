import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  template: `
    <section style="text-align:center; max-width:720px; margin:auto;">
      <h1>Album Browser</h1>
      <p>Lorem ispum</p>
      <p style="margin-top:1rem;"><a class="pill" routerLink="/albums">Browse Albums</a></p>
    </section>
  `,
  styles: [`.pill{display:inline-block;padding:0.5rem 1rem;border-radius:6px;background:#4f46e5;color:white;text-decoration:none}`]
})
export class HomeComponent {}
