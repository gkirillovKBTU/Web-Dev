import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { NavItem } from '../types/navigations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('album-browser');
  navItems : NavItem[] =
    [
      {"path": "/albums", label: "AlbumComponent"},
      {"path": "/about", label: "AboutComponent"}
    ]
  ;
}
