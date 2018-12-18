import { Component } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];
  albums:any[] = [];
  loading: boolean;
  order:string = 'release_date'
  constructor( private router: ActivatedRoute,
    private spotify: SpotifyService,
    private orderPipe: OrderPipe) {
      this.router.params.subscribe( params =>{
        console.log('idArtista',params['id']);
        this.getArtista( params['id'] );
        this.getTopTracks( params['id'] );
        this.getAlbums( params['id'] );
      });
    }

    getArtista(id: string){
      this.loading = false;
      this.spotify.getArtista( id )
      .subscribe( (artista: any) =>{
        this.loading = true;
      this.artista = artista;
        console.log(artista);
      });
    }
    getTopTracks( id: string ){
      this.spotify.getTopTracks( id )
          .subscribe( topTracks =>{
            console.log(topTracks);
            this.topTracks = topTracks;
            //this.topTracks = topTracks;
          });
    }
    getAlbums( id: string ){
      this.spotify.getAlbums( id )
          .subscribe( albums =>{
            console.log(albums);
            this.albums = albums;
            this.orderPipe.transform(this.albums, this.order);
            //this.topTracks = topTracks;
          });
    }
  }
