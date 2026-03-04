import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [CommonModule],
  template: `
    <section style="max-width:720px;margin:auto;">
      <h2>About</h2>
      <p>This application is a Album Browse </p>
      <p><strong>Author:</strong> Grigoriy</p>
      <p><strong>Course:</strong> Web Development</p>
    </section>
  `
})
export class AboutComponent {}
