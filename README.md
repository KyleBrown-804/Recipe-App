# Recipe-App

[Goal]

  This recipe logging app was built using Expo, React Native, and Google Firebase. The goal of this
  project was to allow users to upload their own cooking recipes to reference later. There were plans
  to eventually implement a social media aspect to include sharing , liking, and commenting on other user's
  however due to time constraints this most likely will not be fulfilled.

[Current State]

  At it's current state the recipe logger allows users to sign up and create an account or login to a 
  prexisting account. Once logged in users are greeted to two screens, the first being one that allows the
  user to enter in form information for a new recipe and take a picture of the finished product. The recipe
  information allows a list of ingredients, a 2200 max character instructions section, servings, calories, 
  total cooktime, and a picture upload.

  The user could then view their uploaded recipes via a secondary screen acessible from the bottom tabs, that
  would display cards showing their recipe's images in a scrollable view. Clicking on any recipe in the list
  would pop up a screen that displays all the information and instructions associated with that recipe.

  A drawer navigation menu can be opened at any time by clicking the hamburger menu icon in the top left corner
  (once signed in) or by swiping from the left edge of the screen to the right. In this drawer navigator would be
  profile settings, app settings, and other customization options including a light/dark theme option. Due to time
  constraints only a basic settings screen was implemented, which on it's page allows a user to logout.

  User login state is stored with Google Firebase which allows for a user to not have to authenticate every time they
  open the app as long as their session token is still valid.

[Directory]

  The authentication logic for this project can be found under Back-End/Auth. Similarly any database interactions
  with Google Firebase can be found under Back-End/Database.

  Custom routing is performed in the Navigation.js file found at the top level of this repository.

  All app screens/pages can be found under Front-End/. The screens are divided up between Authentication associated
  screens such as the intial login/signup form under Front-End/Auth-Screens while the normal app screens are under
  Front-End/App-Screens.
