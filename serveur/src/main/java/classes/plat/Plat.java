//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.5-2 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2020.04.07 à 11:58:30 PM CEST 
//

package classes.plat;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import classes.ingredient.Ingredient;
import classes.typedeplat.TypeDePlat;

/**
 * <p>
 * Classe Java pour Plat complex type.
 * 
 * <p>
 * Le fragment de schéma suivant indique le contenu attendu figurant dans cette
 * classe.
 * 
 * <pre>
 * &lt;complexType name="Plat">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="type" type="{http://Classes/TypeDePlat}TypeDePlat"/>
 *         &lt;element name="prix" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *         &lt;element name="ingredients" type="{http://Classes/Ingredient}Ingredient" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Plat", propOrder = { "id","nom", "type", "prix", "ingredients" })
public class Plat {

    @XmlElement(required = true)
    protected String id;
    @XmlElement(required = true)
    private String nom;
    @XmlElement(required = true)
    protected TypeDePlat type;
    protected double prix;
    protected String photo;
    @XmlElement(required = true)
    protected List<Ingredient> ingredients;

    public Plat(String id,String nom, TypeDePlat type, double prix, String photo, List<Ingredient> ingredients) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.prix = prix;
        this.photo = photo;
        this.ingredients = ingredients;
	}

    public Plat() {}


	/**
     * Obtient la valeur de la propriété id.
     * 
     * @return possible object is {@link String }
     * 
     */
    public String getId() {
        return id;
    }

    /**
     * Définit la valeur de la propriété id.
     * 
     * @param value allowed object is {@link String }
     * 
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Obtient la valeur de la propriété type.
     * 
     * @return possible object is {@link TypeDePlat }
     * 
     */
    public TypeDePlat getType() {
        return type;
    }

    /**
     * Définit la valeur de la propriété type.
     * 
     * @param value allowed object is {@link TypeDePlat }
     * 
     */
    public void setType(TypeDePlat value) {
        this.type = value;
    }

    /**
     * Obtient la valeur de la propriété prix.
     * 
     */
    public double getPrix() {
        return prix;
    }

    /**
     * Définit la valeur de la propriété prix.
     * 
     */
    public void setPrix(double value) {
        this.prix = value;
    }

    /**
     * Gets the value of the ingredients property.
     * 
     * <p>
     * This accessor method returns a reference to the live list, not a snapshot.
     * Therefore any modification you make to the returned list will be present
     * inside the JAXB object. This is why there is not a <CODE>set</CODE> method
     * for the ingredients property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * 
     * <pre>
     * getIngredients().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list {@link Ingredient }
     * 
     * 
     */
    public List<Ingredient> getIngredients() {
        if (ingredients == null) {
            ingredients = new ArrayList<>();
        }
        return this.ingredients;
    }

    public void setIngredients(ArrayList<Ingredient> listIngr) {
        this.ingredients = listIngr;
    }
    public void addIngredient(Ingredient ingr){
        this.ingredients.add(ingr);
    }

    public void setPhoto(String textContent) {
        this.photo = textContent ;
    }

    public String getPhoto() {
        return photo;
    }

    /**
     * @return the nom
     */
    public String getNom() {
        return nom;
    }

    /**
     * @param nom the nom to set
     */
    public void setNom(String nom) {
        this.nom = nom;
    }

}
