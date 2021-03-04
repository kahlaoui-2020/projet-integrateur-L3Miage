export interface Carte {
    plat: Plats[]
}

export interface Plats {
    id?: string,
    nom?: string,
    type?: string, // Allowed Values: ENTREE, PLAT, DESSERT, BOISSON
    prix?: number,
    photo? : string,
    ingredients?: string
}
