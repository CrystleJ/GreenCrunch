# GreenCrunch
Finance Management Web Application
GitHub Repository: https://github.com/CrystleJ/GreenCrunch

# Setup/Installations

## Java Spring-Boot
Ensure that you have Java installed. If Java is not installed, go to https://www.java.com/en/download/ and install Jave 8 or higher for your machine.

## Angular
1. Check your node version by running the command 'node -v'. If the node command is not recognized or the node version is less than 8.x, install node from here: https://nodejs.org/en/
2. To install Angular 5, run the following command on a terminal window: npm install -g @angular/cli@1.7.4 
3. Once installed, change the directory to client (Ex: 'cd ./GreenCrunch/client')
4. Run the command 'npm install' 

# Build/Run
## Server (Spring-Boot)
All the REST APIs are defined within the server folder. The server is made with Spring-Boot, which uses Java. The server is also connected to our MySQL database via JDBC. To build the code and run the server:
1. Open a terminal window
2. Change the directory to 'server/application'
3. To run the server enter the following command: './mvnw spring-boot:run' (The server should build and run)

## Client (Angular)
All the frontend code is within the client directory. Angular calls the REST APIs to interact with the server.
1. Open a new terminal window
2. Change the directory to client
3. To run service enter the following command: 'ng serve' (The code should compile with no errors)

Important: Both the server and the client should be running simultaneously

## Web Application Walk Through
1. On a browser go to http://localhost:4200/ (You should be directed to the home page)
2. Click on the 'Login/Sign In' button
3. First time users, click on the registeration url, and create and fill in the fields to create a account. For returning user, just enter your Okta account username and password (Once your credentials are validated, you should be redirected to the home page again)
4. Click on 'Dashboard', 'Budget', 'Transactions', and 'Articles' to explore all the features
