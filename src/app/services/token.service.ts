import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public  token: any;
  access_token:string;
  url: string = GLOBAL.url;

  constructor(private http:HttpClient) { }

  requestToken(): Observable<any>{
    let tokenSpotifyExpired = localStorage.getItem('tokenSpotifyExpired');
    let tokenSpotify:any = localStorage.getItem('tokenSpotify');
    let now = Date.now().toLocaleString();
    if( now < tokenSpotifyExpired ){
      console.log('todavia sirve',tokenSpotify);

//  return tokenSpotify;
}
    let base;
    var client_id = 'f0a9341ad7af49129fa96c85a159f293';
    var client_secret = 'ae5b0d36d4fd4e26883d695942af1f8d';
    base = this.http.get(`${this.url}token/${client_id}/${client_secret}`);

    const request = base.pipe(
      map((data: any) => {
        console.log('request',data['access_token']);
        if (data['access_token']) {

          this.saveToken(data['access_token'],  Date.now() + 3600);
        }
        return data['access_token'];
      })
    );
    return request;

  }

  private saveToken(token, expired): void {
    console.log('expired',expired);
    localStorage.setItem('tokenSpotify', token);
    localStorage.setItem('tokenSpotifyExpired', expired);
    this.token = token;

  }


}
