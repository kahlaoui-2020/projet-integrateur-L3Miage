/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Gestion;

import classes.client.Client;
import classes.commande.Commande;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author  groupe 9
 */
public class ClientDAO extends SqlDAO<Client>{

    
    /**
     *
     * @throws SQLException
     */
    public ClientDAO() throws SQLException{
        super();
        connect = new Connection();
    }

    @Override
    public boolean delete(Client obj) {
        boolean resultat = false;
        
        try{
            connect.Connexion();
            int result = connect.requestUpdate("DELETE FROM Clients WHERE numClient = '"+obj.getId()+"'");
            if(result==1){
                resultat = true;
                connect.getInstance().commit();
            }else {
                connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(ClientDAO.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            connect.disconnect();
        }
        return resultat;
    }

    @Override
    public boolean update(Client obj) {
        
        boolean resultat = false;
        try{
            connect.Connexion();
            int result = connect.requestUpdate("UPDATE Clients SET photo="+obj.getPhoto()+", email="+obj.getEmail()+", tel="+obj.getTel()+", adresse="+obj.getAdresse()+"");
            if(result==1){
                resultat = true;
                connect.getInstance().commit();
            }else {
                connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(ClientDAO.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            connect.disconnect();
        }
        return resultat;
    }

    public Client read(String id) {
        Client client = new Client();
        try{
            connect.Connexion();
            ResultSet result =  connect.requestSet("SELECT * FROM Clients WHERE numClient='"+id+"'");
            if(result.next()){
                
                client.setId(id);
                client.setNom(result.getString("nom"));
                client.setPrenom(result.getString("prenom"));
                client.setPhoto(result.getString("photo"));
                client.setTel(result.getString("tel"));
                client.setEmail(result.getString("email"));
                client.setAdresse(result.getString("adresse"));
                client.setPoint(Integer.valueOf(result.getString("pointfidelite")));
                connect.getInstance().commit();
            }else{
               
               connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(ClientDAO.class.getName()).log(Level.SEVERE, null, ex);        
        }finally{
            connect.disconnect();
        }
        return client;
    }

    @Override
    public boolean create(Client obj) {
        
        boolean resultat = false;
        try{
            connect.Connexion();

            int result = connect.requestUpdate("INSERT INTO Clients (numClient,nom,prenom,adresse,email,photo,tel,pointfidelite) VALUES ('"+obj.getId()+"','"+obj.getNom()+"','"+obj.getPrenom()+"','"+obj.getAdresse()+"','"+obj.getEmail()+"','"+obj.getPhoto()+"','"+obj.getTel()+"',"+obj.getPoint()+")");

            if(result==1){
                resultat = true;
                connect.getInstance().commit();
            }else {
                connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(ClientDAO.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            connect.disconnect();
        }
        return resultat;
        
    }

    public String find(String nom, String prenom) {
        
        String clientId = ""; 
        try{
            connect.Connexion();
            ResultSet result = connect.requestSet("SELECT numClient FROM Clients WHERE nom='"+nom+"' and prenom='"+prenom+"'");
            if(result.next()){
                clientId = result.getString("numClient");
                connect.getInstance().commit();
            }else{
                connect.getInstance().rollback();
            }
        }catch(SQLException ex){
            Logger.getLogger(ClientDAO.class.getName()).log(Level.SEVERE, null, ex);        
        }finally{
            connect.disconnect();
        }
        return clientId;
        
    }

    public ArrayList<Commande> readCommandes(String id) {
        ArrayList<String> ids = new ArrayList<>();
        ArrayList<Commande> commandes = new ArrayList<>();
        Commande commande;
        try{
            connect.Connexion();
            ResultSet result = connect.requestSet("SELECT distinct(numCommande) FROM Commandes WHERE numClient='"+id+"'");
            while(result.next()){
                ids.add(result.getString("numCommande"));
            }
            for(String e : ids){
                result = connect.requestSet("SELECT * FROM Commandes WHERE numCommande='"+e+"'");
                List<String> idP = new ArrayList<>();
                List<String> idF = new ArrayList<>();
                commande = new Commande();
                if(result.next()){
                    
                    commande.setId(result.getString("numCommande"));
                    commande.setIdClient(id);
                    commande.setDate(result.getString("dateCde"));
                    commande.setAdresseLivraison(result.getString("adresseCde"));
                    commande.setPrix(Double.valueOf(result.getString("prixCde")));
                    result = connect.requestSet("SELECT  codeArticle FROM   Commander  WHERE (numCommande='"+e+"' AND categorie = 'film') ");
                    if(result.next()){
                        idF.add(result.getString("codeArticle"));
                        while(result.next()){
                            idF.add(result.getString("codeArticle"));
                        }
                    }
                    result = connect.requestSet("SELECT  codeArticle FROM   Commander  WHERE (numCommande='"+e+"' AND categorie = 'plat') ");
                    if(result.next()){
                        System.out.println("2");
                        idP.add(result.getString("codeArticle"));
                        while(result.next()){
                            idP.add(result.getString("codeArticle"));
                        }
                    }
                    commande.setIdPlats(idP);
                    commande.setIdFilms(idF);
                
                }
                commandes.add(commande);
            
            }
            
        }catch(SQLException ex){
            Logger.getLogger(ClientDAO.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            connect.disconnect();
        }
        return commandes;
    }
}