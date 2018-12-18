import { Component, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjetas-albums',
  templateUrl: './tarjetas-albums.component.html',
  styles: []
})
export class TarjetasAlbumsComponent{

  @Input() items:any[]=[];
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  verAlbum( item: any ){

    let albumId;

      albumId = item.id;

  this.router.navigate([ '/album' , albumId ],{ relativeTo: this.route });
  }

}
