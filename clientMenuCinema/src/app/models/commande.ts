export class Commande{

    constructor(public id: string,
                public date: Date,
                public film: Film,
                public plat: Plat,
                public adresse: string,
                public prix: number
               ){

    }
}

export class Film {
  constructor(public idFilm: string,
              public quantiteFilm: number){

  }

}

export class Plat {
  constructor(public idPlat: string,
              public quantitePlat: number){
    
  }
}
