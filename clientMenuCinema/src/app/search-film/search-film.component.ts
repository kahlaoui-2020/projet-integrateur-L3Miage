import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize, map, shareReplay } from 'rxjs/operators';
import { SearchMovieResponse, SearchMovieQuery } from '../tmdb-data/searchMovie';
import { MovieResponse } from '../tmdb-data/Movie';
import { TmdbService } from '../tmdb.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.scss']
})
export class SearchFilmComponent implements OnInit {

    filmCount$: Observable<number>;
    filmList$: Observable<MovieResponse[]>;
    error: Error;
    lesfilms: MovieResponse [] = [];
    sFilm: SearchMovieResponse;


  constructor( private tmdb: TmdbService) { 
    
    this._initializeObservables();
    }

    retry() {
        this._initializeObservables();
    }

  async   _initializeObservables() {

        this.error = null;


        this.tmdb.init( environment.tmdbKey );        
        for (let i = 1; i < 8000000; i++) {      
          try {
            let film = await this.tmdb.getMovie(i);
            
            if(film.poster_path != null){
              this.lesfilms.push(film);
            }
          } catch (Error) {
            console.error;
          }      
        }




        

    }
  ngOnInit(): void {
    
    
  }

  async searchFilm(query: SearchMovieQuery) {
    this.tmdb.init( environment.tmdbKey );
    try {
      this.sFilm = await this.tmdb.searchMovie(query);
    } catch (Error) {
      console.error;
    }
  }

}
