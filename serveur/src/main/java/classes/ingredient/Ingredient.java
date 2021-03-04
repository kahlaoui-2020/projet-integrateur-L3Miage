


package classes.ingredient;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;



@XmlType(name = "Ingredient", namespace = "http://Classes/Ingredient")
@XmlEnum
public enum Ingredient {

    @XmlEnumValue("Riz")
    RIZ("Riz"),
    @XmlEnumValue("Coeur de laitue")
    COEURDELAITUE("Coeur de laitue"),
    @XmlEnumValue("Crouton de pain")
    CROUTONDEPAIN("Crouton de pain"),
    @XmlEnumValue("Poulet")
    POULET("Poulet"),
    @XmlEnumValue("Parmesan")
    PARMESAN("Parmesan"),
    @XmlEnumValue("Saumon")
    SAUMON("Saumon"),
    @XmlEnumValue("Fromage")
    FROMAGE("Fromage"),
    @XmlEnumValue("Moutarde")
    MOUTARDE("Moutarde"),
    @XmlEnumValue("Saucisse de poulet")
    SAUCISSEDEPOULET("Saucisse de poulet"),
    @XmlEnumValue("Jus de citron")
    JUSDECITRON("Jus de citron"),
    @XmlEnumValue("Escalope de poulet")
    ESCALOPEDEPOULET("Escalope de poulet"),
    @XmlEnumValue("Brocolis")
    BROCOLIS("Brocolis"),
    @XmlEnumValue("Poivrons rouges")
    POIVRONSROUGES("Poivrons rouges"),
    @XmlEnumValue("Poivrons jauges")
    POIVRONSJAUGES("Poivrons jauges"),
    @XmlEnumValue("Ciboulette")
    CIBOULETTE("Ciboulette"),
    @XmlEnumValue("Huile d'olive")
    HUILEDOLIVE("Huile d'olive"),
    @XmlEnumValue("Sel")
    SEL("Sel"),
    @XmlEnumValue("Jambono de Parme")
    JAMBONODE_PARME("Jambono de Parme"),
    @XmlEnumValue("Pain Burger")
    PAIN_BURGER("Pain Burger"),
    @XmlEnumValue("Salade")
    SALADE("Salade"),
    @XmlEnumValue("Concombre")
    CONCOMBRE("Concombre"),
    @XmlEnumValue("Mayonnaise")
    MAYONNAISE("Mayonnaise"),
    @XmlEnumValue("Oignons")
    OIGNONS("Oignons"),
    @XmlEnumValue("Tomate")
    TOMATE("Tomate"),
    @XmlEnumValue("Steak")
    STEAK("Steak"),
    @XmlEnumValue("Pommes de terre")
    POMMEDETERRE("Pommes de terre"),
    @XmlEnumValue("Huile")
    HUILE("Huile"),
    @XmlEnumValue("Paprika")
    PAPRIKA("Paprika"),
    @XmlEnumValue("Spaghetti")
    SPAGHETTI("Spaghetti"),
    @XmlEnumValue("Sauce Tomate")
    SAUCE_TOMATE("Sauce Tomate"),
    @XmlEnumValue("Lardons")
    LARDONS("Lardons"),
    @XmlEnumValue("Jaune d'oeuf")
    JAUNEDOEUF("Jaune d'oeuf"),
    @XmlEnumValue("Pates Lasagnes")
    PATES_LASAGNES("Pates Lasagnes"),
    @XmlEnumValue("Olives")
    OLIVES("Olives"),
    @XmlEnumValue("Basilic")
    BASILIC("Basilic"),
    @XmlEnumValue("Blanc de poulet")
    BLANCDEPOULET("Blanc de poulet"),
    @XmlEnumValue("Poivrons")
    POIVRONS("Poivrons"),
    @XmlEnumValue("Pommes")
    POMMES("Pommes"),
    @XmlEnumValue("Kiwi")
    KIWI("Kiwi"),
    @XmlEnumValue("Banane")
    BANANE("Banane"),
    @XmlEnumValue("Mozzarella")
    MOZZARELLA("Mozzarella"),
    @XmlEnumValue("Thon")
    THON("Thon"),
    @XmlEnumValue("Chocolat")
    CHOCOLAT("Chocolat"),
    @XmlEnumValue("Poisson")
    POISSON("Poisson"),
    @XmlEnumValue("Miel")
    MIEL("Miel"),
    @XmlEnumValue("Sauce soya")
    SAUCESOYA("Sauce soya"),
    @XmlEnumValue("Lait")
    LAIT("Lait"),
    @XmlEnumValue("Oeufs")
    OEUFS("Oeufs"),
    @XmlEnumValue("Poivron")
    POIVRON("Poivron"),
    @XmlEnumValue("Caramelle")
    CARAMELLE("Caramelle"),
    @XmlEnumValue("Fraise")
    FRAISE("Fraise"),
    @XmlEnumValue("Farine")
    FARINE("Farine"),
    @XmlEnumValue("Beurre")
    BEURRE("Beurre"),
    @XmlEnumValue("Sucre")
    SUCRE("Sucre"),
    @XmlEnumValue("Sucre roux")
    SUCREROUX("Sucre roux"),
    @XmlEnumValue("Noix")
    NOIX("Noix"),
    @XmlEnumValue("Chocolat Blanc")
    CHOCOLAT_BLANC("Chocolat Blanc"),
    @XmlEnumValue("Mascapone")
    MASCAPONE("Mascapone"),
    @XmlEnumValue("Philadelphia")
    PHILADELPHIA("Philadelphia"),
    @XmlEnumValue("Limonade")
    LIMONADE("Limonade"),
    @XmlEnumValue("Menthe")
    MENTHE("Menthe"),
    @XmlEnumValue("Citron")
    CITRON("Citron"),
    @XmlEnumValue("Sirop de peche")
    SIROP_DE_PECHE("Sirop de peche");
    private final String value;

    Ingredient(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static Ingredient fromValue(String v) {
        for (Ingredient c: Ingredient.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
