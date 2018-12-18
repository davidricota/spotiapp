import { Component } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styles: []
})
export class AlbumComponent {
  album:any = {};
  tracks: any[] = [];
  loading: boolean;
  loading2: boolean;

  constructor( private router: ActivatedRoute,
    private spotify: SpotifyService) {
      this.router.params.subscribe( params =>{
        this.getTracks( params['id'] );
        this.getAlbum( params['id'] );
      });
    }
    getAlbum(id:string){
      this.spotify.getAlbum( id )
      .subscribe( album =>{
        console.log('album',album);
        this.album = album;
        this.loading2 = true;
        
      });
    }
    getTracks( id: string ){
      this.spotify.getTracks( id )
      .subscribe( tracks =>{
        console.log('tracks',tracks);
        this.tracks = tracks;
        this.loading = true;
        
      });
    }
    addToList(){
      console.log('test');
    }
  }
