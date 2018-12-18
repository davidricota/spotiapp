import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { AlbumComponent } from './components/album/album.component';
import { LoginComponent } from './components/login/login.component';
import { ListaComponent } from './components/lista/lista.component';
import { ListasComponent } from './components/listas/listas.component';
import { PlayerComponent } from './components/player/player.component';

export const ROUTES: Routes = [
  // { path:'', pathMatch: 'full', redirectTo: 'home' },
  // { path:'**', pathMatch: 'full', redirectTo: 'home' },
  { path:'home', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'search', component: SearchComponent },
  { path:'artist/:id', component: ArtistaComponent },
  { path:'album/:id', component: AlbumComponent },
  { path:'listas', component: ListasComponent },
  { path:'player', component: PlayerComponent },
  { path:'lista/:id', component: ListaComponent,
    children:[
      {path:'', component: SearchComponent},
      {path: 'artista/:id',component: ArtistaComponent},
      {path: 'artista/:id/album/:id',component: AlbumComponent},
]
  }
];
