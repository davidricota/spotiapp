import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global';
import {List} from '../models/list';

@Injectable()
export class ListService{
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	addList(token, list){
		let params = JSON.stringify(list);
		let headers = new HttpHeaders().set('Content-type','application/json')
									   .set('Authorization',token);
		return this._http.post(this.url + 'lists', params, {headers:headers});
	}
	getLists(token, page = 1){
	//	console.log('token',token);
		let headers = new HttpHeaders().set('Content-type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url + 'lists/' + page, {headers:headers});
	}
	getList(token,id){
	//	console.log('token',token);
		let headers = new HttpHeaders().set('Content-type','application/json')
									   .set('Authorization',token);
		return this._http.get(this.url + 'list/' + id, {headers:headers});
	}
}
