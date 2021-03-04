/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package l3m;

import Gestion.ClientDAO;
import classes.client.Client;
import classes.commande.Commande;
import com.google.gson.Gson;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author groupe 9
 */
public class ClientServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    
    
   
    // Permet de recuperer tous les commande d'un client
    
   
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response){
        
        String userId = request.getParameter("numClient");
        try {
            ClientDAO clientDAO = new ClientDAO();
            ArrayList<Commande> commandes = new ArrayList<>();
            commandes = clientDAO.readCommandes(userId);
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println(new Gson().toJson(commandes));
        } catch (SQLException | IOException ex) {
            Logger.getLogger(ClientServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    
    }
    // Permet d'enregistrer un nouveau client
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response){
    
        String idUser = request.getParameter("numClient");
        String nom = request.getParameter("nom");
        String prenom = request.getParameter("prenom");
        String photo = request.getParameter("photo");
        String email = request.getParameter("email");
        String tel = request.getParameter("tel");
        String add = request.getParameter("add");
          
        try {
            ClientDAO clientDAO = new ClientDAO();
            Client client = new Client(idUser,nom,prenom);
            client.setPhoto(photo);client.setEmail(email);client.setTel(tel);client.setAdresse(add);
            boolean result = clientDAO.create(client);
            response.getWriter().println(result);
        } catch (SQLException | IOException ex) {
            Logger.getLogger(ClientServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
  
    }
    // Permet la suppression d'un client
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
        String idUser = request.getParameter("numClient");
        try {
            ClientDAO clientDAO = new ClientDAO();
            Client client = new Client();client.setId(idUser);
            boolean result = clientDAO.delete(client);
            response.getWriter().println(new Gson().toJson(result));
        } catch (SQLException ex) {
            Logger.getLogger(ClientServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
       
    }
    // Permet la mise a jour des info d'un client 
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String photo = request.getParameter("photo");
        String email = request.getParameter("email");
        String tel = request.getParameter("tel");
        String add = request.getParameter("add");
        
        try {
            ClientDAO clientDAO = new ClientDAO();
            Client client = new Client();
            client.setPhoto(photo);client.setEmail(email);client.setTel(tel);client.setAdresse(add);
            boolean result = clientDAO.update(client);
            response.getWriter().println(result);
        } catch (SQLException ex) {
            Logger.getLogger(ClientServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        
    }
    
    
    
}
