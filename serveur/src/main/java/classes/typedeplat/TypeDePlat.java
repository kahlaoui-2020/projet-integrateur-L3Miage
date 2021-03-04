//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.5-2 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2020.04.07 à 11:58:51 PM CEST 
//


package classes.typedeplat;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java pour TypeDePlat.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * <p>
 * <pre>
 * &lt;simpleType name="TypeDePlat">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="Entree"/>
 *     &lt;enumeration value="Plat"/>
 *     &lt;enumeration value="Dessert"/>
 *     &lt;enumeration value="Boisson"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "TypeDePlat", namespace = "http://Classes/TypeDePlat")
@XmlEnum
public enum TypeDePlat {

    @XmlEnumValue("Entree")
    ENTREE("Entree"),
    @XmlEnumValue("Plat")
    PLAT("Plat"),
    @XmlEnumValue("Dessert")
    DESSERT("Dessert"),
    @XmlEnumValue("Boisson")
    BOISSON("Boisson");
    private final String value;

    TypeDePlat(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static TypeDePlat fromValue(String v) {
        for (TypeDePlat c: TypeDePlat.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
