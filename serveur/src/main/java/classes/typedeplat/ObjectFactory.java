//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.5-2 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2020.04.07 à 11:58:51 PM CEST 
//


package classes.typedeplat;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the classes.typedeplat package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _TypePlat_QNAME = new QName("http://Classes/TypeDePlat", "typePlat");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: classes.typedeplat
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link TypeDePlat }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://Classes/TypeDePlat", name = "typePlat")
    public JAXBElement<TypeDePlat> createTypePlat(TypeDePlat value) {
        return new JAXBElement<TypeDePlat>(_TypePlat_QNAME, TypeDePlat.class, null, value);
    }

}
