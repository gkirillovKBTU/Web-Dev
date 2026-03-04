import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumService } from './album.service';
import { Album } from '../types/albumServiceTypes';

@Component({
  standalone: true,
  selector: 'app-album-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section style="max-width:720px;margin:auto;">
      <h2>Album Detail</h2>
      <p *ngIf="!album() && isLoading()">Loading...</p>
      <div *ngIf="album()">
        <p><strong>Title:</strong> {{album()?.title ?? 'No title'}}</p>
        <p><strong>ID:</strong> {{album()?.id ?? 'No id'}}</p>
        <p><strong>User ID:</strong> {{album()?.userId ?? 'No user id'}}</p>
        <p>
          <label>Title: <input [(ngModel)]="title" style="width:100%" /></label>
        </p>
        <p>
          <button (click)="save()">Save</button>
          <a [routerLink]="['/albums', album()!.id, 'photos']" style="margin-left:0.5rem">View Photos</a>
          <button (click)="back()" style="margin-left:0.5rem">Back</button>
        </p>
      </div>
    </section>
  `
})
export class AlbumDetailComponent implements OnInit {
  album = signal<Album | null>(null);
  isLoading = signal(false);
  title = '';

  svc = inject(AlbumService);
  router = inject(Router);
  cur_route = inject(ActivatedRoute)

  async ngOnInit() {
    this.isLoading.set(true);
    const id = Number(this.cur_route.snapshot.paramMap.get('id'));
    this.album.set(await this.svc.getAlbum(id));
    this.isLoading.set(false);
  }

  async save() {
    if (!this.album()) return;
    const updated = await this.svc.updateAlbum(this.album()!.id, { title: this.title });
    this.album.set(updated);
  }

  back() {
    this.router.navigate(['/albums']);
  }
}
