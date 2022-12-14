## Introduction

This project is testing Blog menu functionalities with e2e approach using Cypress.

- JavaScript is used for this project
- Test cases are written in Gherkin Language for BDD approach with Cucumber
- Page Object Models (POM) design structure is used
- Data driven testing with the fixtures folder and scenario outlines
- The project can be connected to a local Jenkins CI & CD in parameterized structure with the scripts at the `package.json`
- Positive, negative and boundary value analysis approach is implemented for test cases in order to increase the coverage
- Clean code structure is applied and hard coding is avoided
- Both UI and API layers are being tested

The project consists of 4 feature files, each of them are testing major functionalities seperately:

1. **HomePageButtonsTesting:** Testing the functionalities starting from the home page until the registration form page
2. **RegistrationFieldTesting:** Testing the functionalities starting from the registration form page until the phone numbers page
3. **ResultPageTesting:** Testing the functionalities starting from the phone numbers page until the results page
4. **API_Testing:** Testing the phone number verification and registration end points

In total, there are 38 test cases (28 Negative 10 Positive)
24 of these test cases are passing however 14 of them are failing because of the existing bugs found on the staging environment. There are 5 major issues for these defects :

- Registration Form FirstName Input Field
- Registration Form LastName Input Field
- Registation Form Password Input Field
- After Registration Phone Number Input Field
- Functionality of the links at the bottom of the Elektriker Gehalt page

It takes around 10 minutes to execute all tests.

The bug reproduce steps along with the proofs will be provided via e-mail.

## Installation

- Make sure you have [Node.js](https://nodejs.org/en/) installed.
- Navigate to the project on the terminal.
- Run `npm install` on the terminal.

## How to run the tests

- In order to run the tests through your terminal, please follow:
  ```sh
  npm run test
  ```
- To execute the tests with headed Electron. Test results will be shown on the terminal.
  ```sh
  npm run headTest
  ```
- To execute the tests in headless mode through Cypress Dashboard. Test results will be shown on the Cypress Dashboard
  ```sh
  npm run dashboardTest
  ```
- To execute the tests with headless mode Chrome. Test results will be shown on the terminal.
  ```sh
  npm run chromeTest
  ```

## Screenshots and Videos

- You can find the screenshots of the execution under `cypress/screenshots` folder
- You can find the videos of the execution under `cypress/videos` folder
- These are ignored in git. However when the tests are deployed to CI, they can be uploaded to their artifacts
