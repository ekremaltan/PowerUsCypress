Feature: Blog salary information e2e API Testing
    Application Positive and Negative Testing


    @Regression @Positive
    Scenario: Phone Number GET API Testing Unique Phone Number
        When a unique phone number is sent as a request id
        Then from the body message exists must be false and the status code should be 200

    @Regression @Positive
    Scenario: Phone Number GET API Testing Already Registered Phone Number
        When an already registered phone number is sent as a request id
        Then from the body message exists must be true and the status code should be 200


    @Regression @Positive
    Scenario: Phone Number GET API Testing Invalid Phone Number
        When an invalid phone number is sent as a request id
        Then from the body message isValid must be false and the status code should be 200


    @Regression @Negative
    Scenario: Register POST API Testing
        When an invalid credentials is sent as a request body
        Then error messages appears on the body of the response with a status code of 400


    @Regression @Positive
    Scenario: Register POST API Testing
        When valid credentials are sent as a request body
        Then the status code should be 201
