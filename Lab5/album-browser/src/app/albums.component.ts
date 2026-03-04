import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AlbumService} from './album.service';
import { Album } from '../types/albumServiceTypes';

@Component({
  standalone: true,
  selector: 'app-albums',
  imports: [CommonModule, RouterModule],
  template: `
    <section style="max-width:900px;margin:auto;">
      <h2>Albums</h2>
      <p *ngIf="isLoading()">Loading...</p>
      <ul *ngIf="!isLoading()">
        <li *ngFor="let a of albums()" style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem;border-bottom:1px solid #eee">
          <a [routerLink]="['/albums', a.id]" style="flex:1;text-decoration:none;color:#111">{{a.id}}. {{a.title}}</a>
          <button (click)="remove(a)" style="margin-left:1rem">Delete</button>  
        </li>
      </ul>
    </section>
  `
})
export class AlbumsComponent implements OnInit {
  albums = signal<Album[]>([]);
  isLoading = signal(false);

  svc = inject(AlbumService);
  router = inject(Router);

  async ngOnInit() {
    this.isLoading.set(true);
    try {
      const albums = await this.svc.getAlbums();
      this.albums.set(albums);
    } catch (e) {
      console.log('Failed to load albums');
    } finally {
      this.isLoading.set(false);
    }
  }

  async remove(a: Album){
    await this.svc.deleteAlbum(a.id);
    this.albums.update(current => current.filter(at => at.id !== a.id));
  }
}
