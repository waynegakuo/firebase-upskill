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
 * Lesson #21 ~ 17th May 2020 (Link: https://youtu.be/C87Un2rIm2g)
 * Setting Firestore Rules with Claims
 * We set the rules that logged in users can only read the guides documents
 * whereas admins can write them ONLY
 */

/**
 * Lesson #22 ~ 17th May 2020 (Link: https://youtu.be/rqz0sy8RDXY)
 * Securing the Cloud Function ~ we would want only admins to add others as admins
 * We do this by doing a check if the user signed in is an admin using 'context'
 * // Check request is made by an admin
        if (context.auth.token.admin !== true) {
            return { error: 'Only admins cana add other admins' }
        }
 * then we run "firebase deploy --only functions" which will update cloud functions we previously had
 */

 /**
  * Lesson #23 ~ 17th May 2020 (Link: https://youtu.be/D8bBmnDQ7ZA)
  * Catching Auth Errors ~ we would like to show our users where they have gone wrong with regards to providing
  * information on authentication
  * We put in some HTML in the signup and login modals that will be holders of the errors when they happen
  * We then add some lines of code in the sign up and login method of well displaying errors that arise from such
  */