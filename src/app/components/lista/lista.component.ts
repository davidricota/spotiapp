import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { List } from '../../models/list';
import { Track } from '../../models/track';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { ListService } from '../../services/list.service';
import { SpotifyService } from '../../services/spotify.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [],
  providers: [UserService,ListService]
})
export class ListaComponent implements OnInit {
  public identity;
  public token;
  public tokenSpotify;
  public title: string;
  public url: string;
  public status: string;
  loading: boolean;
  _this = this;
  tracks: any[];
  artistas:any[]= [];
  tracksAlbum:any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _listService: ListService,
    private _spotifyService: SpotifyService,
    private _tokenService: TokenService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    this._tokenService.requestToken().subscribe((token:any)=>{
      this.tokenSpotify = token;
      localStorage.setItem('tokenSpotify', this.tokenSpotify);
      console.log('localStorage',this.tokenSpotify);
      this.route.params.subscribe( params =>{
        this.getList( params['id'],this._this );
      });
    });
  }
  buscar(termino:string){
    this.loading = true;

    this._spotifyService.getTracksArtistas(termino)
    .subscribe((data:any)=>{
      console.log('data',data);
      this.artistas = data['artists'].items;
      this.tracksAlbum = data['tracks'].items;
      this.loading = false;
      console.log('artistas',this.artistas);
      console.log('tracks',this.tracksAlbum);
      
    });
  }
  ngOnInit() {
    console.log('listas cargado!');
    this.loading = true;
  }
  getList(id,_this){

    let tracks: Array<Track> = [];
    this._listService.getList(this.token, id).subscribe(
      response =>{
        this.loading = false;
        this.title = response['list'].name;
        if(response['tracks']){

          response['tracks'].forEach(function(track) {
            console.log(track);
            _this._spotifyService.getTrack( track.track )
            .subscribe( track =>{
              console.log('track',track);
              tracks.push( track);

            },err=>{
              console.log('errorcito',err);
            });


          });

          this.tracks = tracks;


        }else{
          this.status = 'error';
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }
}
