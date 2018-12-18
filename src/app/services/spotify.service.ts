import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private http:HttpClient) {

   }





getQuery(query: string){
  let access_token = localStorage.getItem('tokenSpotify');
  console.log('get localStorage',access_token);
  const url = `https://api.spotify.com/v1/${ query }`;

  const headers = new HttpHeaders({
      'Authorization':`Bearer ${access_token}`
      //'Authorization':'Bearer BQCvKPuZEL6Er2-6yVEXKtb3JR9wb4PBAYQxPTPhH4SbBqzzMz6hYLML6XngWw98dKLFlRUzzxskF8eZF_ocn2QxuhFe069LqfluWFkFSNnySFHXS0kmVhD-xIkL-Kr9kpahdCU0fb-DX4VEUyA'
  });
  return this.http.get(url,{ headers });
}

  getNewReleases(){
return this.getQuery('browse/new-releases?country=AR')
           .pipe(map(data => data['albums'].items ));

  }
  getArtistas( termino: string ){
    return  this.getQuery(`search?query=${termino}&type=track,artist&market=AR&offset=0&limit=20`)
                .pipe(map(data => data['artists'].items ));
  }
  getTracksArtistas( termino: string ){
    return  this.getQuery(`search?query=${termino}&type=track,artist&market=AR&offset=0&limit=20`);
  }
  getArtista( id: string ){
    return  this.getQuery(`artists/${id}`);
                //.pipe(map(data => data['artists'].items ));
  }
  getTopTracks( id: string ){
    return  this.getQuery(`artists/${ id }/top-tracks?country=AR`)
                .pipe(map(data => data['tracks'] ));
  }
  getTracks( id: string ){
    return  this.getQuery(`albums/${ id }/tracks`)
                .pipe(map(data => data['items'] ));
  }
  getTrack( id: string ){
    return  this.getQuery(`tracks/${ id }`);

  }
  getAlbums( id: string ){
    let albums =  this.getQuery(`artists/${ id }/albums`)
               .pipe(map(data => data['items'] ));
               return albums;
  }
  getAlbum( id: string ){
    let album =  this.getQuery(`albums/${ id }/`)
               .pipe(map(data => data ));
               return album;
  }
}
