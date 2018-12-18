import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { List } from '../../models/list';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { ListService } from '../../services/list.service';


@Component({
	selector: 'app-listas',
	templateUrl: './listas.component.html',
	providers: [UserService,ListService]
})

export class ListasComponent implements OnInit {
	public identity;
	public token;
	public title: string;
	public url: string;
	public status: string;
	public page;
	public total;
	public pages;
	public itemsPerPage;

	public listas: List[];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private _userService: UserService,
		private _listService: ListService
	){
		this.title = "Listas";
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.page = 1;
	}

	ngOnInit(){
		console.log('listas cargado!');
		this.getLists(this.page);
	}
	getLists(page){
		this._listService.getLists(this.token, page).subscribe(
			response =>{
					console.log(response);
					if(response['lists']){
						this.total = response['total_items'];
						this.pages = response['pages'];
						this.itemsPerPage = response['itemsPerPage'];

						this.listas = response['lists'];



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
  verLista( item: any ){

    let listaId;

      listaId = item._id;

  this.router.navigate([ '/lista' , listaId ]);
  }
}
