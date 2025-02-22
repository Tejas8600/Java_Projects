package electricity.billing.system;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class database {

    // For Establishing the connection.
    Connection connection;

    // For Creating Statements.
    Statement statement;

    // database named constructor.
    database(){
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Bill_system", "root", "Iamnirmalprem21@");
            statement = connection.createStatement();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
