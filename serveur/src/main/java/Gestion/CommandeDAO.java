/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Gestion;

import classes.commande.Commande;
import static java.sql.Types.DATE;
import java.sql.Date;
import classes.plat.Plat;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author groupe 9
 */
public class CommandeDAO extends SqlDAO<Commande>{
    
    
    
    public CommandeDAO() throws SQLException{
        super();
        connect = new Connection();
    }

    @Override
    public boolean delete(Commande obj) {
        boolean resultat = false;
        try{
            connect.Connexion();
            int result = connect.requestUpdate("DELETE FROM Commandes WHERE numCommande = "+obj.getId()+"");
            if(result==1){
                connect.getInstance().commit();
                result = connect.requestUpdate("DELETE FROM Commander WHERE numCommande = "+obj.getId()+"");
                resultat = true;
                connect.getInstance().commit();
            }else {
                connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(CommandeDAO.class.getName()).log(Level.SEVERE, null, ex);        
        }finally{
            connect.disconnect();
        }
        return resultat;
    }

    @Override
    public boolean update(Commande obj) {
        return super.update(obj); //To change body of generated methods, choose Tools | Templates.
    }

    @SuppressWarnings("unchecked")
    public Commande read(String id) {
        Commande commande = new Commande();
        try{
            connect.Connexion();
            ResultSet result =  connect.requestSet("SELECT * FROM Commandes WHERE numCommande="+id+"");
            if(result.next()){
                List<String> idPlats = new ArrayList(), idFilms = new ArrayList();
                commande.setId(String.valueOf(id));
                commande.setDate(result.getString("dateCde"));
                commande.setIdClient(result.getString("numClient"));
                commande.setPrix(Double.valueOf(result.getString("prixCde")));
                commande.setAdresseLivraison("adresseCde");
                
                result = connect.requestSet("SELECT  codeArticle FROM   Commander  WHERE numCommande="+id+" AND categorie = 'film' ");
                if(result.next()){
                    idFilms.add(result.getString("codeArticle")) ;
                    while(result.next()){
                    idFilms.add(result.getString("codeArticle")) ;
                    }
                }
                
                
                result = connect.requestSet("SELECT  codeArticle FROM   Commander  WHERE numCommande="+id+" AND categorie = 'plat' ");
                if(result.next()){
                    idPlats.add(result.getString("codeArticle")) ;
                    while(result.next()){
                        idPlats.add(result.getString("codeArticle")) ;
                    }                
                }
                commande.setIdFilms(idFilms);
                commande.setIdPlats(idPlats);
                connect.getInstance().commit();
            }else{
                connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(ClientDAO.class.getName()).log(Level.SEVERE, null, ex);        
        }finally{
            connect.disconnect();
        }
        return commande;    
    }

    @Override
    public boolean create(Commande obj) {
        boolean resultat = false;
        Plat plat = new Plat();
        int result = 0;

        try{
            connect.Connexion();
            result = connect.requestUpdate("INSERT INTO Commandes (numCommande,numClient,dateCde,prixCde,adresseCde) "
                       + "VALUES ('"+obj.getId()+"','"+obj.getIdClient()+"',TO_DATE('"+obj.getDate()+"','DD-MM-YYYY HH:MI:SS'),"+obj.getPrix()+",'"+obj.getAdresseLivraison()+"')");
           
                    /* for(String e : obj.getIdPlats()){
         ResultSet resultP =  connect.requestSet("SELECT prixArticle FROM Articles WHERE prixArticle='"+e+"' AND categorie='plat'");
         if(resultP.next()){
             int prixP;
             prixP = Integer.valueOf(resultP.getString("prixArticle"));
            
             result = connect.requestUpdate("INSERT INTO Commander (numCommande,codeArticle,prixArticle,quantite,categorie) "
                     + "VALUES ("+obj.getId()+",'"+e+"',"+prixP+",1,'plat')");
             


               //reste encore calcul de quantité et si tu veux ajouter les film aussi  dans la commande 
               //on fait la meme chose .
               
               }
            }*/
            if(result == 1) {
                resultat = true;
                connect.getInstance().commit();
            }else {
                connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(CommandeDAO.class.getName()).log(Level.SEVERE, null, ex);        
        }finally{
            connect.disconnect();
        }
        return resultat;
        
    }
    
    
    
}
