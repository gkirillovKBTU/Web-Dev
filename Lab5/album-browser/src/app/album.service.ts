import { Injectable } from '@angular/core';

import { Album, Photo } from '../types/albumServiceTypes';



const BASE = 'https://jsonplaceholder.typicode.com';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  async getAlbums(): Promise<Album[]> {
    const res = await fetch(`${BASE}/albums`);
    console.log(res);
    return res.json();
  }

  async getAlbum(id: number): Promise<Album> {
    const res = await fetch(`${BASE}/albums/${id}`);
    return res.json();
  }

  async deleteAlbum(id: number): Promise<void> {
    await fetch(`${BASE}/albums/${id}`, { method: 'DELETE' });
  }

  async updateAlbum(id: number, data: Partial<Album>): Promise<Album> {
    const res = await fetch(`${BASE}/albums/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async getPhotosForAlbum(id: number): Promise<Photo[]> {
    const res = await fetch(`${BASE}/albums/${id}/photos`);
    return res.json();
  }
}
