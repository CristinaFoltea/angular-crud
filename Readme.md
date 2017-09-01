I created a simple angular crud app that displays a list of resources  with a RESTfull api for data storage and manipulation

 Determining the site's file structure was a little challenging. My previous experiences and reading on best practices online helped me to come up with the existing structure. Since the site is fairly simple, I have the server and all the site management files at the root and all the front-end files in the public folder.

 server.js has the code for app's backend. I am using Express for the server with nodemon for server restart when I make changes and express.Router for api routes. For data storage I am using mongo  and moongose for data modeling. Initially, I tried to use heroku's add-ons for the database connection, but a timeout error made me consider other options. I ended up creating an mlab sandbox that worked for the purpose of this app.

 The public folder where the front-end code rests has the following structure:
  - app folder with all angular-related files
  - pages folder that contains page related html
  - scss folder with the global scss styles( all my scss file get compiled to css by a npm script)
  - index.html with the base html file
  - main.css with all the sites scss compiled to css

At the root of the app folder there is an app.js file that the angular module gets declared and the app's configs (hashbang removal from the url and the front-end routes). I created a data service appService.js to communicate between the controller and the api. I am using $q so that the service returns a promise than can be used by the controller once the data is back.
I built 2 pages, one from all the data displays and a second one for creating, editing or building individual resources. Each page has its own controller that connects the data from the API by calling the service and the directive, and also some hight level functionality. I wanted to give the user the ability to use some of the existing data while updating or creating new resources like existing resources types and categories and since on initial load all data from database gets retrive I grab all existing types and categories at that moment and save it to local storage, for a app in production creating a specific collection in database for that specific purpose would be a better idea.
There are 2 components folders (resource-list and resource-entry) each with a directive for Dom manipulation and data binding, a template and a scss that styles that specific components only.
The  resource-entry component is used for both creating new resource and updating existing ones.

Things I would improve:
  - A would add a task manager, Gulp or Webpack to automatize and add tasks to the app(js and css minification and concatination, jsLint, autoprefixer, compile the scss to css) and create a serving folder with production code.
  - Create a better interface
  - Adding more filtering a sorting capabilities
  - Make the site responsive
  - Add user accounts
