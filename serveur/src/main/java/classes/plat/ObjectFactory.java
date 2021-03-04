//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.5-2 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2020.04.07 à 11:58:30 PM CEST 
//


package classes.plat;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the classes.plat package. 
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

    private final static QName _Plat_QNAME = new QName("http://Classes/Plat", "plat");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: classes.plat
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link Plat }
     * 
     */
    public Plat createPlat() {
        return new Plat();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Plat }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://Classes/Plat", name = "plat")
    public JAXBElement<Plat> createPlat(Plat value) {
        return new JAXBElement<Plat>(_Plat_QNAME, Plat.class, null, value);
    }

}
