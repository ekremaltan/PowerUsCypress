Feature: Blog salary information e2e Testing
    Application Positive, Negative, Boundary Value Analysis Testing


    @Regression @Positive
    Scenario: Blog menu Electrician option functionality
        Given user is on the Home page
        When user clicks on the Blog button
        Then all menu items are shown and clickable
        When user clicks on the Elektriker Gehalt option
        Then elektriker gehalt header is displayed
        And the url contains elektriker gehalt as an endpoint
        And Kostenlos Gehalt checken button is clickable
        And all Allgemeine Gehaltsübersicht links should be clickable
        When user click on the Kostenlos Gehalt checken button
        Then progress bar is %25 filled
        And proficiency options are displayed
        When user clicks on one degree option
        Then progress bar is %50 filled
        And years of experience options are displayed and clickable
        When user clicks on one years of experience option
        Then progress bar is %75 filled
        And willingness to travel options are displayed and clickable
        When user clicks on one mobility option
        Then progress bar is %100 filled
        And state header is displayed
        And all states are clickable
        And the Kostenlos Dein Gehalt sehen button is displayed

    @Regression @Positive
    Scenario: Blog menu Electrician option functionality
        Given user is on the Home page
        When user clicks on the Blog button
        And user clicks on the Elektriker Gehalt option
        Then elektriker gehalt header is displayed
        When user scrolls down to the page
        Then all the buttons at the bottom of the page should be clickable
        When clicks on the Elektriker Gehalt link
        Then the page should scroll up and elektriker gehalt header should be displayed

    @Regression @Negative
    Scenario: States dropdown functionality negative testing
        Given user is on the state step page
        When user tries to proceed to the next section without choosing any state
        Then user receives Erforderlich warning message


    @Regression @Positive
    Scenario: States dropdown functionality positive testing
        Given user is on the state step page
        When user chooses one state
        And user clicks on the Kostenlos Dein Gehalt sehen button
        Then user is on the registration form page
