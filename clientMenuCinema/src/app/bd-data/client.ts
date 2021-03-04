export interface Client {
    id?: string,
    nom?: string,
    prenom?: string,
    photo?: string,
    email?: string,
    tel?:string,
    adresse?: string,
    point?: number
   
}

export interface Articles {
    codeArticle?: string,
    libelleArticle?: string,
    prixArticle?: number,
    categorie?: string
}

export interface CommandeCli{
    commande?: CommandeClient[]
}

export interface CommandeClient {
    id?: string,
    date?: Date,
    idClient?: string,
    idFilms?: Articles[],
    idPlats?: Articles[],
    prix?: number,
    adresseLivraison?: string
}