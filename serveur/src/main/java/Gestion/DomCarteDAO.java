/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Gestion;

import classes.carte.Carte;
import classes.ingredient.Ingredient;
import classes.plat.Plat;
import classes.typedeplat.TypeDePlat;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 *
 * @author groupe 9
 */
public class DomCarteDAO extends DomDAO<Carte>{

    @Override
    public boolean delete(Carte obj) {
        return super.delete(obj); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean update(Carte obj) {
        return super.update(obj); //To change body of generated methods, choose Tools | Templates.
    }

    
    @Override
    public Carte read(String id) {
        Carte carte = new Carte();
        Plat plat;
        try {
            DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = domFactory.newDocumentBuilder();
            Document _doc = builder.parse(new File("src/main/java/schema/carte.xml"));
            Element menuElt = _doc.getDocumentElement();
            String idElt;
            String nomElt;
            String typeElt;
            String photoElt;
            Double prixElt;
            
            ArrayList<Ingredient> listIngr;
            NodeList listIngrElt;
            NodeList listPlatElt = menuElt.getElementsByTagName("ns1:plat");
            for (int index = 0; index < listPlatElt.getLength(); index++) {
                idElt = listPlatElt.item(index).getChildNodes().item(1).getTextContent();
                nomElt = listPlatElt.item(index).getChildNodes().item(3).getTextContent();
                typeElt = listPlatElt.item(index).getChildNodes().item(5).getTextContent();
                photoElt = listPlatElt.item(index).getChildNodes().item(9).getTextContent();
                prixElt = Double.valueOf(listPlatElt.item(index).getChildNodes().item(7).getTextContent());
                listIngrElt = ((Element)listPlatElt.item(index)).getElementsByTagName("ns2:ingredients");
                listIngr = new ArrayList<>();
                for (int i = 0; i < listIngrElt.getLength(); i++) {
                    listIngr.add(Ingredient.fromValue(listIngrElt.item(i).getTextContent()));
                }
                plat = new Plat(idElt,nomElt,TypeDePlat.fromValue(typeElt),prixElt,photoElt,listIngr);
                carte.addPlat(plat);
        }
        } catch (ParserConfigurationException | SAXException | IOException ex) {
            Logger.getLogger(DomCarteDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
         
        return carte;
    }

    @Override
    public boolean create(Carte obj) {
        return super.create(obj); //To change body of generated methods, choose Tools | Templates.
    }

    
    
}
