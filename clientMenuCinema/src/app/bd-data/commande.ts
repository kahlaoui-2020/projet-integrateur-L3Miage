export interface Commande{
    id?: string,
    date?: string,
    idClient?: string,
    idFilms?: string[],    
    idPlats?: string[],
    prix?: number,
    addresseLivraison?: String
}

