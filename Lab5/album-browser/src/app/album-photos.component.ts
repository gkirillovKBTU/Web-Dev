import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { AlbumService } from './album.service';
import { Photo } from '../types/albumServiceTypes';

@Component({
  standalone: true,
  selector: 'app-album-photos',
  imports: [CommonModule, RouterModule],
  template: `
    <section style="max-width:1000px;margin:auto;">
      <h2>Photos</h2>
      <p *ngIf="isLoading()">Loading photos...</p>
      <div class="grid" *ngIf="!isLoading()">
        <figure *ngFor="let p of photos()" style="margin:0;">
          <img [src]="p.thumbnailUrl" [alt]="p.title" />
          <figcaption style="max-width:120px">{{p.title}}</figcaption>
        </figure>
      </div>
      <p style="margin-top:1rem;"><button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors" (click)="back()">Back</button></p>
    </section>
  `,
  styles: [`.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:0.75rem}.grid img{width:100%;height:auto;border-radius:6px}`]
})
export class AlbumPhotosComponent implements OnInit {
  photos = signal<Photo[]>([]);;
  isLoading = signal(false);

  svc = inject(AlbumService);
  router = inject(Router);
  cur_route = inject(ActivatedRoute)


  async ngOnInit(): Promise<void> {
    this.isLoading.set(true);
    const id = Number(this.cur_route.snapshot.paramMap.get('id'));
    this.photos.set(await this.svc.getPhotosForAlbum(id));
    this.isLoading.set(false);
  }

  back() {
    const id = this.cur_route.snapshot.paramMap.get('id');
    this.router.navigate(['/albums', id]);
  }
}
