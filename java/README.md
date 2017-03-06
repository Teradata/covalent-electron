### To compile JDBCWrapper into jar

* Ensure you the Java JDK installed
* cd into the java directory
* run `javac -cp lib/json.jar:. JDBCWrapper.java`
* run `jar cfe lib/JDBCWrapper.jar JDBCWrapper JDBCWrapper.class`
* now running electron app will use this jar instead