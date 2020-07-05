import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
  }

}
