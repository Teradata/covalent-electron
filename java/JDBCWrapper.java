import java.util.Scanner;
import java.sql.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JDBCWrapper {

  private static Connection con;

  private static JSONArray convertToJSON(ResultSet resultSet) throws Exception {
    JSONArray jsonArray = new JSONArray();

    while (resultSet.next()) {
        int total_rows = resultSet.getMetaData().getColumnCount();
        JSONObject obj = new JSONObject();
        for (int i = 0; i < total_rows; i++) {
            obj.put(resultSet.getMetaData().getColumnLabel(i+1)
                    .toLowerCase(), resultSet.getObject(i + 1));
        }
        jsonArray.put(obj);
    }

    return jsonArray;
  }

  public static void main (String[] args) {

      try {
        // create a scanner so we can read the command-line input
        Scanner scanner = new Scanner(System.in);

        // prompt for the jdbc url
        System.out.print("Enter url:");
        // get their input jdbc url as a String
        String url = scanner.nextLine();

        // prompt for the jdbc driverName
        System.out.print("Enter driverName:");
        // get their input jdbc driverName as a String
        String driverName = scanner.nextLine();

        // prompt for the jdbc username
        System.out.print("Enter username:");
        // get their input jdbc username as a String
        String username = scanner.nextLine();

        // prompt for the jdbc password
        System.out.print("Enter password:");
        // get their input jdbc password as a String
        String password = scanner.nextLine();

        while (true) {
            String input = scanner.nextLine();

            if ("!quit".equals(input)) {
                // Close the connection
                JDBCWrapper.con.close();
                System.exit(0);
            } else if ("runSQL".equals(input)) {
                try {
                    // get their input sql as a String
                    String sql = scanner.nextLine();
                    if (JDBCWrapper.con == null) {
                        // Loading the Teradata JDBC driver
                        Class.forName(driverName);
                        // Attempting to connect to Teradata
                        // Creating a connection object
                        JDBCWrapper.con = DriverManager.getConnection(url, username, password);
                    }
                    // Creating a statement object from an active connection
                    Statement stmt = JDBCWrapper.con.createStatement();

                    // Submit a query, creating a result set object
                    ResultSet rs = stmt.executeQuery(sql);

                    // Extract and display result set table data
                    JSONArray jsonData = JDBCWrapper.convertToJSON(rs);
                    System.out.println(jsonData);
                    // Close the statement
                    stmt.close();
                } catch (SQLException ex) {
                    // A SQLException was generated.  Catch it and display
                    // the error information.
                    // Note that there could be multiple error objects chained
                    // together.
                    while (ex != null) {
                        ex.printStackTrace();
                        ex = ex.getNextException();
                    }

                    throw new IllegalStateException ("Execute failed.") ;
                }
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
  }

}