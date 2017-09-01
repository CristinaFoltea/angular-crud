I created a simple angular crud app that displays and creates a list of resources with a RESTfull API for data storage and manipulation.

 Determining the site's file structure was a little challenging. My previous experiences and reading on best practices helped me to develop the existing structure. Since the site is fairly simple, I have the server and all the site management files at the root, and all the front-end files in the public folder.

 server.js has the code for app's backend. I am using Express for the server with nodemon for server restart when changes are made and express.Router for API routes. I am using mongodb for data storage and mongoose for data modeling. Initially, I tried to use heroku's add-ons for the database connection, but a timeout error made me consider other options. I ended up creating an mlab sandbox that worked for the purpose of this app. Dotenv is used to keep the batabase credentials hidden.

 The public folder where the front-end code rests has the following structure:
  - app folder with all angular-related files
  - pages folder that contains page-related html
  - scss folder with the global scss styles (all my scss file get compiled to css and watched by a npm script)
  - index.html with the base html file
  - main.css with all the sites scss compiled to css

At the root of the app folder there is an app.js file that the angular module gets declared, and the app's configs (hashbang removal from the url and the front-end routes).

I created a data service appService.js to communicate between the controller and the API. I am using $q so that the services returns a promise than can be used by the controller once the data is back.

The app has two pages, one from all the data displays and a second one for creating, editing or building individual resources. Each page has its own controller that connects the data from the API by calling the service and the directive, and also some high-level functionality. I wanted to give the user the ability to use some of the existing data while updating or creating new resources like existing resource types and categories, and since on initial load all data from database gets retrieved, I grab all existing types and categories at that moment and save it to local storage so it can be accessed from anywhere in the app without needing to make extra API calls, for an app in production creating a specific collection in a database for that specific purpose would be a better idea.

There are two components folders (resource-list and resource-entry) each with a directive for Dom manipulation and data binding, a template and a scss that styles that specific component only.
The resource-entry component is used for both creating new resources and updating the existing ones.

Things I would improve:
  - I would add a task manager, Gulp or Webpack to automate and add tasks to the app (js and css minification and concatenation, jsLint, autoprefixer, compile the scss to css) and create a serving folder with code for production.
  - Create a better interface
  - Adding more filtering and sorting capabilities
  - Make the site responsive
  - Add user accounts
