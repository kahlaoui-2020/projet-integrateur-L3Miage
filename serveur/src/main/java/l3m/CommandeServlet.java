/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package l3m;

import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Gestion.CommandeDAO;
import classes.commande.Commande;

/**
 *
 * @author groupe 9
 */
public class CommandeServlet extends HttpServlet{
    
    private static final long serialVersionUID = 1L;

    
    
    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response){
        
        final String id = request.getParameter("id");

        
        
        try {
            final CommandeDAO commandeDAO = new CommandeDAO();
            final Commande commande = commandeDAO.read(id);
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println(new Gson().toJson(commande));
        } catch (IOException | SQLException ex) {
            Logger.getLogger(CommandeServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
        
        


    
    
    @Override
    protected void doPost(final HttpServletRequest request, final HttpServletResponse response){

    
    try {
       
        final Commande commande = new Commande();
        commande.setId(request.getParameter("id"));
        commande.setDate(request.getParameter("date"));
        commande.setIdClient(request.getParameter("idClient"));
        commande.setAdresseLivraison(request.getParameter("adresseLivraison"));
        commande.setPrix (Double.valueOf(request.getParameter("prix")));
        
       // String[] menu = request.getParameterValues("idPlats");
        //or (String menu1 : menu) { commande.addPlat(menu1);}
       // String[] films = request.getParameterValues("idFilms");
        //for(String film1 : films) { commande.addFilm(film1);}
        
        final CommandeDAO commandeDAO = new CommandeDAO();
        final boolean result = commandeDAO.create(commande);
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println(result);
    } catch (SQLException | IOException ex) {
        Logger.getLogger(CommandeServlet.class.getName()).log(Level.SEVERE, null, ex);
    }
} 
}
        
            
