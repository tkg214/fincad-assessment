# FINCAD Tech Assessment

# Startup instructions:
* clone repository and cd into it
* ``` yarn add ``` or ``` npm install ```
* create a .env file with one environment variable set to ``` REACT_APP_API_HOST=https://jsonplaceholder.typicode.com ```
* ``` yarn start ``` or ``` npm start ``` to start the development server (automatically opens localhost:3000)
* ``` yarn test ``` or ``` npm test ``` to run tests
* ``` yarn build ``` or ``` npm run build ``` to bundle using webpack

## Some Considerations
* create-react-app is used to minimize the setup time (best for assessments like these) but a more robust application would have a more configurable boilerplate with manual setup
* Pagination (would normally split posts into pages for better UX)
* Routing (no routes according to the project specs but could be done using React Router)
* Authentication (would normally use JWT token based auth but uses a simple query to the API)
* Sensitive information is exposed to non-authenticated users (email and name)
* Tests are only unit tests for UI components, but there should be integration tests and end-to-end tests (outside the scope of assessment)
