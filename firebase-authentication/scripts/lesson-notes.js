 /**
* Lesson #17: Introduction to Custom Claims & Cloud Functions (Link: https://youtu.be/SSiLsIkPQWs)
*
* Custom Claims
* Extra bits of information that can be associated with a particular user
* Firebase auth ~ User id, Email
*     * Custom Claims ~ admin: true, premium: true
* Cloud functions- they run on the server. Good for code you don't want to expose on the client. Perform
* tasks not available to client users. Callable from the frontend
* we have to install the firebase CLI: npm install firebase-tools -g
* We initialize the functions locally first and then deploy the functions to database. We do this by firebase init functions
* Make sure to login with the correct account for your Firebase project -- firebase login
*/

/**
 * Lesson #18: Cloud Function/Adding Claims (Link: https://youtu.be/4wa3CMK4E2Y)
 * Created a function that would add an admin role to a specific user. ~ More in functions/index.js
 * Getting user based on the email we send along, then w/ that user we set a custom user claim to that user and the claim is
 * admin: true
 * 
 * We deploy the functions only using firebase deploy --only functions ~ we check the functions tab in our 
 * Firebase project and see our first cloud function deployed.
 */