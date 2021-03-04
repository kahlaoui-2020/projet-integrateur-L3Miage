package l3m;


import Gestion.ClientDAO;
import classes.client.Client;
import com.google.gson.Gson;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


// Je suis passé par l'itération 0 du serveur...
public class ClientAuthentificationServlet extends HttpServlet  {
	private static final long serialVersionUID = 1L;

        @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            
            String userId = request.getParameter("numClient");
            
            
            try {
                ClientDAO clientDAO = new ClientDAO();
                response.getWriter().println( "client information");

                Client client = clientDAO.read(userId);
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().println(new Gson().toJson(client));
            } catch (SQLException | IOException | NumberFormatException ex) {
                Logger.getLogger(ClientAuthentificationServlet.class.getName()).log(Level.SEVERE, null, ex);
            }           
    }

	/*____________________________________________________________________________________________________________________
	 * doPost is expecting a HTTP parameter userId
	 * It sends back a XML serialization of the previous command with HTTP code 200 if a userId is specifyed
	 * It sends back a HTTP code 401 error if the userId is not specified or empty
	 * It sends back a HTTP code 500 error if a problem occured when accessing to the database
	 */
        @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException    {
            response.setContentType("text/plain");
            // Extract userId from HTTP parameters
            String userId = request.getParameter("numClient");
        
            // Call the database and return result
            try {
                String res = BdAccess.authentifyUser(userId);
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().println( res  + ". " + processQueryTest(request) );

            // HTTP code 500 error
            } catch (SQLException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().println( e.toString() );
            // HTTP code 401 error 
            } catch (IOException e1) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().println( e1.toString() );
            } catch(Exception e2) {
                Logger.getLogger(ClientAuthentificationServlet.class.getName()).log(Level.SEVERE, null, e2);
            }
        
        
    }

	private String processQueryTest(HttpServletRequest request) {
		String res = "{";
		Enumeration<String> P = request.getParameterNames();
		while (P.hasMoreElements()) {
			String p = P.nextElement();
			res += "\"" + p + "\": \"" + request.getParameter(p) + "\", ";
		}
		return res + "}";
	}

}