/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Gestion;

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
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 *
 * @author groupe 9
 */
public class DomPlatDAO extends DomDAO<Plat>{

    @Override
    public boolean delete(Plat obj) {
        return false;
    }

    @Override
    public boolean update(Plat obj) {
        return false;
    }

    public Plat read(String id) {
        Plat plat = null;
        
        try {
            DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = domFactory.newDocumentBuilder();
            Document _doc = builder.parse(new File("src/main/java/schema/carte.xml"));
            NodeList carte = _doc.getElementsByTagName("ns1:plat");
            int i = 0;
            String idElt = "";
            Node platElt = carte.item(i);
            idElt = platElt.getChildNodes().item(1).getTextContent();
            while(i < carte.getLength() && !idElt.equals(id)){
                i++;
                platElt = carte.item(i);
                idElt = platElt.getChildNodes().item(1).getTextContent();
            }
            if(i < carte.getLength()){
                double prix = Double.valueOf(platElt.getChildNodes().item(7).getTextContent());
                String photo = platElt.getChildNodes().item(9).getTextContent();
                String nomElt = platElt.getChildNodes().item(3).getTextContent();
                TypeDePlat type = TypeDePlat.fromValue(platElt.getChildNodes().item(5).getTextContent());
                
                NodeList ingrElt = ((Element)platElt).getElementsByTagName("ns2:ingredients");
                ArrayList<Ingredient> list = new ArrayList<>();
                for(i = 0; i < ingrElt.getLength(); i++){
                    list.add(Ingredient.fromValue(ingrElt.item(i).getTextContent()));
                }
                plat = new Plat(id,nomElt,type,prix,photo,list);
            }
      
        } catch (ParserConfigurationException | SAXException | IOException ex) {
            Logger.getLogger(DomPlatDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return plat;
    }

    @Override
    public boolean create(Plat obj) {
        return false;
    }
    
    
    
    
}
