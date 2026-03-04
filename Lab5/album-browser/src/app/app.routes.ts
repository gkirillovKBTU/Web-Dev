import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { AlbumsComponent } from './albums.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumPhotosComponent } from './album-photos.component';
import { ShowComponent } from './show.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'kirill', component: ShowComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'albums', component: AlbumsComponent },
	{ path: 'albums/:id', component: AlbumDetailComponent },
	{ path: 'albums/:id/photos', component: AlbumPhotosComponent },
	{ path: '**', redirectTo: '' }
];
