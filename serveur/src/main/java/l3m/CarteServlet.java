/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package l3m;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Gestion.DomCarteDAO;
import classes.carte.Carte;

/**
 *
 * @author groupe 9
 */
public class CarteServlet extends HttpServlet{
    
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response){
        
        
        try {
            DomCarteDAO DomCarte = new DomCarteDAO();
            Carte carte = DomCarte.read("");
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println(new Gson().toJson(carte));
        } catch (IOException ex) {
            Logger.getLogger(CarteServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    
}
