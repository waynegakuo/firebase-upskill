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

 /**
  * Lesson #20 (Link: https://youtu.be/paNuap1mw3A)
  * Getting the custom claim set in the frontend to condition views
  * While checking if the logged in user has a tokenclaim using getIdTokenResult(), at first it's false/undefined
  * One needs to logout first and log back in for it to change to true
  * We attach the admin property to the user temporarily ~ solves issue of log out-log in
  */

  /**
   * Lesson #21 ~ 17th May 2020
   * Setting Firestore Rules with Claims
   * We set the rules that logged in users can only read the guides documents
   * whereas admins can write them ONLY
   */