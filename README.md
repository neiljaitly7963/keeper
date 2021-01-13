This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

The config will be loaded from src/mock/data/AppConfig.json .
It you want to test with real backend open a real request for example:
https://candynow.storekeepercloud.com/apps/order-request/h2p0t66y7c8r05gi/

Then dump in the console `JSON.stringify(window.AppConfig)` on the real request 
and copy it to `src/mock/data/AppConfig.json` after this append the base url 
to the `api.baseUrl` key. So 
```json
{
  "instanceId": "h2p0t66y7c8r05gi",
  "api": {
    "baseUrl": "/apps/order-request/h2p0t66y7c8r05gi/api/",
    "apiKey": "w1eryvggi4qoisl4",
```
becomes:
```json
{
  "instanceId": "h2p0t66y7c8r05gi",
  "api": {
    "baseUrl": "https://candynow.storekeepercloud.com/apps/order-request/h2p0t66y7c8r05gi/api/",
    "apiKey": "w1eryvggi4qoisl4",
```
### `npm run start-mock`

Same as `npm start` , the mock server is on. It will intercept all xhr requests and return local data.
See the implementation in `src/mock/index.js`, data is in `src/mock/data`.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Configure phpStorm: https://blog.jetbrains.com/webstorm/2018/10/testing-with-jest-in-webstorm/

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## translation

### `npm run translate`

This executes the following steps. 

### `npm run translation:extract`

First we extract the translations from the code.

### `npm run translation:json2pot`

Then we convert the json file to a POT file.

### `npm run translation:poedit`

This will open `src/locales/.translations/nl.po` with poedit.

Once done, we first need to update the nl.po file with the `messages.pot` in the same repository:
- Category
- Update from POT file
- Navigate to `src/locales/.translations/messages.pot` and open the file

Once done we can start translating. Where after you need to save (This updates the `nl.po` and `nl.mo` file)

### `npm run translation:po2json`

This will update the `src/locales/translation.json` file.

Once this command has ran. Rou are done!  


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
