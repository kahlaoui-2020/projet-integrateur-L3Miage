/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package l3m;


import Gestion.ClientDAO;
import Gestion.DomCarteDAO;
import Gestion.DomPlatDAO;
import classes.carte.Carte;
import classes.client.Client;
import classes.commande.Commande;
import classes.ingredient.Ingredient;
import classes.plat.Plat;

import java.sql.SQLException;
import java.util.ArrayList;

import Gestion.ClientDAO;
import classes.commande.Commande;

/**
 *
 * @author kahlaoui
 */
public class Test {
    
    public static void main(String[] args) throws SQLException{
        
        /*System.out.println("---------------- !!!");
        DomCarteDAO carteDAO = new DomCarteDAO();
        System.out.println("---------------- !!!");
        Carte carte = carteDAO.read("");
        System.out.println("---------------- !!!");
        List<Plat> menu = carte.getPlat();
        System.out.println("---------------- "+menu.size()+" !!!");
        for(Plat e : menu){
            System.out.println("ID : "+e.getId());
            System.out.println("TYPE : "+e.getType());
            System.out.println("PRIX : "+e.getPrix());
            System.out.println("PHOTO : "+e.getPhoto());
            for(Ingredient i : e.getIngredients()){
                System.out.println("INGREDIENTS : "+i);
            }
        }*/
        
       /* ClientDAO client = new ClientDAO();
        Client cli = new Client();
        //cli.setId("facebook");
        //boolean respend = client.create(cli);
       // System.out.println("---------------- : "+respend);
         cli = client.read("bbaOMltKzON2pDNk7DcMWMJxM8D2");
        System.out.println("---------------- !!!");
        System.out.println("ID : "+cli.getId());
            System.out.println("NOM : "+cli.getNom());
            System.out.println("PRENOM : "+cli.getPrenom());
            System.out.println("TEL : "+cli.getTel());
            
        
        
        /*for(Commande c : com ){
            System.out.println("ID : "+c.getId());
            System.out.println("IDCLIENT : "+c.getIdClient());
            System.out.println("DATE : "+c.getDate());
            System.out.println("PRIX : "+c.getPrix());
            System.out.println("ADRESSE : "+c.getAdresseLivraison());
            
        for(String e : c.getIdPlats()){
            System.out.println("IDPLAT : "+e);
        }
        for(String e : c.getIdFilms()){
            System.out.println("IDFILM : "+e);
        }
        
        
        }*/
       DomPlatDAO platDAO = new DomPlatDAO();
       Plat plat = platDAO.read("103");
       System.out.println("plat d'id : "+plat.getId());
           System.out.println("nom du plat : "+plat.getNom());
           System.out.println("Photo du plat : "+plat.getPhoto());
           System.out.println("Type de plat "+plat.getType());
           System.out.println("Prix de plat : "+plat.getPrix());
           for(Ingredient i : plat.getIngredients()){
               System.out.println("List ingredinet : "+i);
           }
       System.out.println("-----------------------------------------------------------------");
       /*DomCarteDAO domCarte = new DomCarteDAO();
       Carte carte = domCarte.read("");
       for(Plat p : carte.getPlat()){
           System.out.println("plat d'id : "+p.getId());
           System.out.println("nom du plat : "+p.getNom());
           System.out.println("Photo du plat : "+p.getPhoto());
           System.out.println("Type de plat "+p.getType());
           System.out.println("Prix de plat : "+p.getPrix());
           for(Ingredient i : p.getIngredients()){
               System.out.println("List ingredinet : "+i);
           }
       
       
       }*/
        
    
    
    }
}
