Feature: Blog salary information e2e Testing
    Application Positive, Negative, Boundary Value Analysis Testing

    @Regression @Negative
    Scenario: Registration input fields functionality testing with no credentials
        Given user is on the registration page
        When user enters no credentials and clicks on the weiter button
        Then user receives Erforderlich warning message for each input field

    @Regression @Negative
    Scenario Outline: Registration input fields functionality testing with invalid firstname
        Given user is on the registration page
        When user enters invalid first name "<first_name>"
        Then user should not proceed to the Phone page
        Examples:
            | first_name                                                  |
            | 987331                                                      |
            | **/+++-                                                     |
            | +&%+/dskladasklgnlkgndsljgnlsnksdlflsakfapo6546646545645679 |


    @Regression @Negative
    Scenario Outline: Registration input fields functionality testing with invalid last name
        Given user is on the registration page
        When user enters invalid last name "<last_name>"
        Then user should not proceed to the Phone page
        Examples:
            | last_name                                                   |
            | 6896                                                        |
            | %&/=                                                        |
            | &??'!hjfdlşskgfsdofdsşfdgjsddsjlfsdfkndls796431314641237898 |

    @Regression @Negative
    Scenario Outline: Registration input fields functionality testing with invalid password
        Given user is on the registration page
        When user enters invalid password "<password>"
        Then user should not proceed to the Phone page
        Examples:
            | password |
            | 1        |
            | 123456   |
            | aaaaaaa  |
            | %%%%%%%  |


    @Regression @Negative
    Scenario Outline: Registration input fields functionality testing with invalid email
        Given user is on the registration page
        When user enters invalid email "<email>"
        Then user should not proceed to the Phone page
        Examples:
            | email                |
            | john_doeoutlook.com  |
            | john_doe@com         |
            | john@doe@outlook.com |
            | .@outlook.com        |


    @Regression @Positive
    Scenario: Registration input fields functionality testing with valid credentials
        Given user is on the registration page
        When user enters credentials on password input field
        Then the password is shown in bullet points
        When user enters valid first_name, last_name, password, and email and clicks on the Weiter button
        Then user should proceed to the phone number page


    @Regression @Positive
    Scenario: Phone number input field functionality valid credentials
        Given user is on the phone number page
        When user enters valid phone number in the input field
        Then user cannot change Germany Country code
        When user clicks on the Kostenlos registrieren button
        Then the Ergebnis header is displayed

