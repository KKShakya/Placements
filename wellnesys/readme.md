## Steps

1 . Created all the folders (config for database, middlewares,controllers,routes .env ,etc) and installed
libraies like mongoose, express, jsonwebtoken, bcrypt, dotenv and nodemon for server running

2 . created server and .env varables for server running on port 8080;

3 . created routes and then controllers to control those routes.

4 . Created a localhost database with name wellnwsys to store user data.

5 . route => "api/users/login" is for logging in user and the rest as mentioned in the documentation

6.  userModal for schema and then Auth.js as middleware to verify user is loogeed in.

7.  Run and test application using postman done




## Challenges faced

1 . login and register was easy but some minor mistakes while debugging ocuured and fixed at the sam time.

2. Also, I first went with type "module" and then got mixed up with exports so followed require method to import and module.exports for exportation.

3. Firstly i made only the given routes but the problem statement was internally asking for register and login, So i made those as well.

4 . Middleware for Error handling has not been implemneted as i got conufsed while creating it.




## learnings

1. There is always some hidden things you have to take measures of while solving a problem.

2. only the upper layer of problem shouldnot be solved but think about other prospects also. Like , in the provblem statement at least three routes were asked but you have to think of how the whole application may work. Register=>Login =>getProfile;
