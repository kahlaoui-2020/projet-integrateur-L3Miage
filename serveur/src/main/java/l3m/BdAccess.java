package l3m;

import Gestion.ClientDAO;
import classes.client.Client;
import java.sql.SQLException;

// Je suis passé par l'itération 0 de la BD...
public class BdAccess {

	static String authentifyUser(String userId) throws SQLException {
            String result = "";
            ClientDAO clientDAO = new ClientDAO();
            Client client = clientDAO.read(userId);
            
            if(client.getId()!=null){
                result="client existe";
           
            }else{
                client.setId(userId);
                if(clientDAO.create(client)){
                    result="client enregistrer";
                }else{
                    result="client n'existe, enregistrement échoué";
                }
            }
            return result;
	}

    private BdAccess() {};

    

}