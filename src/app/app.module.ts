import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { ROUTES } from './app.routes';
import { NoimagePipe } from './pipes/noimage.pipe';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { LoginComponent } from './components/login/login.component';
import { ListasComponent } from './components/listas/listas.component';
import { AlbumComponent } from './components/album/album.component';
import { TarjetasAlbumsComponent } from './components/tarjetas-albums/tarjetas-albums.component';
import { ListaComponent } from './components/lista/lista.component';
import { PlayerComponent } from './components/player/player.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { TarjetasTracksComponent } from './components/tarjetas-tracks/tarjetas-tracks.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    NoimagePipe,
    TarjetasComponent,
    LoadingComponent,
    DomseguroPipe,
    LoginComponent,
    ListasComponent,
    AlbumComponent,
    TarjetasAlbumsComponent,
    ListaComponent,
    PlayerComponent,
    TracksComponent,
    PlaylistComponent,
    TarjetasTracksComponent
  ],
  imports: [
    OrderModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
