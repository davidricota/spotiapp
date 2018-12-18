import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit  {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  txtError: string;
  token:any;
  constructor( private spotify:SpotifyService, private tokenService:TokenService ) {
    this.loading = true;
    this.error = false;

  }

  ngOnInit() {
    this.tokenService.requestToken().subscribe((token:any)=>{
      this.token = token;
      localStorage.setItem('tokenSpotify', this.token);
      console.log('localStorage Home',this.token);
 
      this.spotify.getNewReleases()
      .subscribe((data:any) =>{
        this.nuevasCanciones = data;
        this.loading = false;
      }, ( errorServicio )=>{
        this.error = true;
        this.loading = false;
        console.log(errorServicio);
        console.log(errorServicio.error.error.message);
        this.txtError = errorServicio.error.error.message;
      });
    });
  }

}
