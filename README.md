<p>***NOTES***</p>

<p>I have pushed a .env file just to easily run the application with little prior configuration</p>

<p>This is a node server</p>

<br>

<p>I implemented Docker to containerize my application. I implemented Mysql for local database use as well as swagger docs to document and run endpoints</p>

<p>I develop in Linux so have to sudo when startup. Just use your local computer's password</p>

<br>

<p>***To start***</p>

<p>npm run i</p>

<p>npm run install-app</p>

<p>npm run serve</p>

<p>client -> localhost:8080</p>

<p>server -> localhost:3000</p>

<p>***Enter local mysql database***</p>

<p>While server is running...</p>

<p> npm run mysql (will bring up a bash)</p>

<p> mysql -u userTakeHome -p</p>

<p>password: takehome

<p>***Using Swagger UI***</p>

<p>You can quickly test and run endpoint through swagger. There are example values although you can create custom values when you click the "Try it out" button then press execute. Window on the bottom will show the endpoint's response data</p>

<p>Swagger UI displays all my endpoint routes there, although if you want to use something like postman, my route base starts with localhost:3000/api/schedules/

<p>To get to Swagger UI go to localhost:3000/admin/swagger</p>
