/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package l3m;

import java.sql.SQLException;

import Gestion.Connection;

/**
 *
 * @author kahlaoui
 */
public class TestBase {
    
    
     public static void main(String[] args) throws SQLException{
         
         Connection conn = new Connection();
         conn.Connexion();
         java.sql.Connection connect = conn.getInstance();
         int i ;
         i = conn.requestUpdate("drop table commander cascade constraints");
         connect.commit();
         System.out.println("----- i = "+i);
     
  
    
         
         
         String request = "create table Commander(\n" +
"	numCommande varchar(5) not null,\n" +
"	codeArticle varchar2(5) not null,\n" +
"	prixArticle number(3,2),\n" +
"	quantite number(3) ,\n" +
"	categorie varchar2(5),\n" +
"	constraint commander_0 primary key (numCommande,codeArticle),\n" +
"	constraint commander_1 foreign key (codeArticle) references Articles(codeArticle),\n" +
"	constraint commander_2 check(prixArticle>0)\n" +
")";
         
          i += conn.requestUpdate(request);
         connect.commit();
         System.out.println("--------- i = "+i);
         
        /*  i = conn.requestUpdate("INSERT INTO Articles VALUES ('F2','achat de Bienvenue chez Mamilia', 3.99 ,'plat')");
         connect.commit();
         i = conn.requestUpdate("INSERT INTO Articles VALUES ('P2','achat Hamburger Frites', 5.99 ,'plat')");
         connect.commit();
         i = conn.requestUpdate("INSERT INTO Articles VALUES ('P3','achat Spaghetti bologniase', 3.99 ,'plat')");
         connect.commit();
         i = conn.requestUpdate("INSERT INTO Articles VALUES ('P5','achat Salade césar', 3.99 ,'plat')");
         connect.commit();
         i = conn.requestUpdate("INSERT INTO Articles VALUES ('F1','achat Le Stagiaire', 2.99 ,'film')");
         connect.commit();
         
         i = conn.requestUpdate("INSERT INTO Articles VALUES ('P4','Pates Carbonara', 3.99 ,'plat')");
         connect.commit();
         i = conn.requestUpdate("INSERT INTO Articles VALUES ('F4','Le diner des cons', 2.99 ,'film')");
         connect.commit();*/
        
         
            i = conn.requestUpdate("INSERT INTO Commander VALUES ('1' , 'P4' , 3.99 , 2 ,'plat')");
         connect.commit();
          System.out.println("--------- i = "+i);
         i = conn.requestUpdate("INSERT INTO Commander VALUES ('1', 'F4' , 2.99 , 2 ,'film')");
         connect.commit();
          System.out.println("--------- i = "+i);
         i = conn.requestUpdate("INSERT INTO Commander VALUES ('2' , 'P2', 5.99 , 2 ,'plat')");
         connect.commit();
          System.out.println("--------- i = "+i);
         i = conn.requestUpdate("INSERT INTO Commander VALUES ('2' , 'F1', 2.99 , 1 ,'film')");
         connect.commit();
          System.out.println("--------- i = "+i);
         i = conn.requestUpdate("INSERT INTO Commander VALUES ('3', 'P3',  3.99 , 1 ,'plat')");
         connect.commit();
          System.out.println("--------- i = "+i);
       
       
     }
    
}
