/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Gestion;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author groupe 9
 */
public class Connection {
    
    private String URL="j" ;
    private String USER="";
    private String PASSWD=""; 
    private static java.sql.Connection connect;
    
    public void Connexion(){
        try {
            System.out.print("Loading Oracle driver... ");
            DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
            System.out.println("loaded");
            System.out.print("Connecting to the database... ");
            connect = DriverManager.getConnection(URL, USER, PASSWD);
            connect.setAutoCommit(false);
            System.out.println("connected");
        } catch (SQLException ex) {
            Logger.getLogger(Connection.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     *
     * @return
     */
    public java.sql.Connection getInstance(){
        return connect;
    };
    
    public void disconnect(){
        try {
            if(!connect.isClosed()){
                connect.close();
            }
        } catch (SQLException ex) {
            Logger.getLogger(Connection.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
     public ResultSet requestSet(String request)  {
        
        Statement stmt = null;
        ResultSet result = null;
        try {
            stmt = connect.createStatement();
            result = stmt.executeQuery(request);
        } catch (SQLException ex) {
            Logger.getLogger(Connection.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    
    }
     public int requestUpdate(String request){
        Statement stmt = null;
        int result = 0;
        try {
            stmt = connect.createStatement();
            result = stmt.executeUpdate(request);
        } catch (SQLException ex) {
            Logger.getLogger(Connection.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
        
    }

    
}
