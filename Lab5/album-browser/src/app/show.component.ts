import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'show-kirill',
  imports: [CommonModule],
  template: `
    <section style="max-width:720px;margin:auto;">
      <h2>Kirill</h2>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4x9ocTc4zn4nntyrJd3qq7_9zZgKTwVS9vA&s">
      <p>This application is a Album Browse </p>
    </section>
  `
})
export class ShowComponent {}