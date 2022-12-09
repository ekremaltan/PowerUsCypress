Feature: Blog E2E Testing
    Application Positive, Negative, Boundary Value Analysis Testing

    @Regression @Negative
    Scenario Outline: Phone number input field functionality invalid credentials
        Given user is on the phone number page
        When user enters invalid phone number "<phone_number>"
        Then an invalid phone number error message is displayed
        When user clicks on the Kostenlos registrieren button
        Then user should not proceed to the next page
        Examples:
            | phone_number                                   |
            | 112                                            |
            | aaa                                            |
            | +495234579                                     |
            | %%%%                                           |
            | 3785564644656546578979794416516464644646456523 |
            | 12345678                                       |
            | 87654321                                       |
            | 543678ff                                       |



    @Regression @Negative
    Scenario Outline: Phone number input field functionality already registered credentials
        Given user is on the phone number page
        When user enters a phone_number that is already registered before "<phone_number>"
        Then an already registered phone number error message is displayed
        When user clicks on the Kostenlos registrieren button
        Then user should not proceed to the next page
        Examples:
            | phone_number |
            | 1234567      |
            | 123654       |
            | 987654       |


    @Regression @Positive
    Scenario: Result page display and change information through filter
        Given user is on the result page
        Then the average salary is displayed
        When user clicks on the filter button
        Then the degree is displayed and matches with the selected one
        And the experience is displayed and matches with the selected one
        And the mobility is displayed and matches with the selected one
        And the state is displayed and matches with the selected one
        When user changes the years of experience
        And user changes the state
        And clicks on the Kostenlos Dein Gehalt sehen button
        Then the average salary amount is changed
        And the new selected state is displayed
        When user clicks on the filter button
        Then the years of experience is updated on the filter section
        And the state is updated on the filter section
