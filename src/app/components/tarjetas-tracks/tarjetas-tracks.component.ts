import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tarjetas-tracks',
  templateUrl: './tarjetas-tracks.component.html',
  styles: []
})
export class TarjetasTracksComponent implements OnInit {
  @Input() items:any[]=[];

  constructor() { }

  ngOnInit() {
  }

}
