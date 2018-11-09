# GreenCrunch
Finance Management Web Application

# Setup/Installations
## Okta
Create a free developer okta account: https://developer.okta.com/signup-now/

## Java Spring-Boot
Just ensure that you have Java installed

## Angular
1. Check your node version by running the command 'node -v'. If the node command is not recognized or the node version is less than 8.x, install node from here: https://nodejs.org/en/
2. To install Angular 5, run the following command on a terminal window: npm install -g @angular/cli@1.7.4 
3. Once installed, change the directory to client (Ex: 'cd ./GreenCrunch/client')
4. Run the command 'npm install' 
5. Run the command 'npm install @okta/okta-angular@1.0.0'
6. Run the command 'npm install --save-exact @angular/material@5.2.4 @angular/cdk@5.2.4'

# Build/Run
## Server (Spring-Boot)
1. Open a terminal window
2. Change the directory to 'server/application'
3. To run the server enter the following command: './mvnw spring-boot:run' (The server should load and you should be able to see a list of car names once it's done loading) **

## Client (Angular)
1. Open a new terminal window
2. Change the directory to client
3. To run service enter the following command: 'ng serve' (The code should compile with now errors)

Important: Both the server and the client should be running simultaneously

## Web Application Walk Through
1. On a browser go to http://localhost:4200/ (You should be directed to the home page)
2. Click on the 'Login' button
3. Enter your Okta account username and password (Once your credentials are validated, you should be redirected to the home page again)
4. Click on the 'Car List' button. You should see a list of the same cars seen in ** (This may take couple of seconds)
5. Click 'Add' on the car-list page to add a car
6. Click on the name of the car to edit the name
7. Click on Logout to logout of the application (This should restrict you from navigating to http://localhost:4200/car-list)

Source for code: https://developer.okta.com/blog/2017/12/04/basic-crud-angular-and-spring-boot
