import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import {
  PHONE_NUMBER_VERIFICATION_ENDPOINT,
  REGISTRATION_ENDPOINT,
} from "./endpoints";
var data = require("../../../../fixtures/example.json");

var req;

const getPhoneNumberVerificationRequest = (phoneNumber) => {
  return cy.request({
    method: "GET",
    url: `${PHONE_NUMBER_VERIFICATION_ENDPOINT}${phoneNumber}`,
  });
};

const postRegistrationRequest = (
  firstName,
  lastName,
  email,
  password,
  phoneNumber
) => {
  return cy.request({
    method: "POST",
    url: REGISTRATION_ENDPOINT,
    body: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      source: "salary-checker",
    },
    failOnStatusCode: false,
  });
};

When("a unique phone number is sent as a request id", () => {
  const randomPhoneNumber = faker.phone.number("50345####");
  req = getPhoneNumberVerificationRequest(randomPhoneNumber);
});

Then(
  "from the body message exists must be false and the status code should be 200",
  () => {
    req.should((response) => {
      expect(response.body.exists).to.be.eq(false);
      expect(response.status).to.eq(200);
    });
  }
);

When("an already registered phone number is sent as a request id", () => {
  req = getPhoneNumberVerificationRequest(data.apiAlreadyRegisteredPhoneNumber);
});

Then(
  "from the body message exists must be true and the status code should be 200",
  () => {
    req.should((response) => {
      expect(response.body.exists).to.be.eq(true);
      expect(response.status).to.eq(200);
    });
  }
);

When("an invalid phone number is sent as a request id", () => {
  req = getPhoneNumberVerificationRequest(data.apiInvalidPhoneNumber);
});

Then(
  "from the body message isValid must be false and the status code should be 200",
  () => {
    req.should((response) => {
      expect(response.body.isValid).to.be.eq(false);
      expect(response.status).to.eq(200);
    });
  }
);

When("an invalid credentials is sent as a request body", () => {
  const {
    apiInvalidFirstName,
    apiInvalidLastName,
    apiInvalidEmail,
    apiInvalidPassword,
    apiInvalidPhoneNumber,
  } = data;
  req = postRegistrationRequest(
    apiInvalidFirstName,
    apiInvalidLastName,
    apiInvalidEmail,
    apiInvalidPassword,
    apiInvalidPhoneNumber
  );
});

Then(
  "error messages appears on the body of the response with a status code of 400",
  () => {
    req.should((response) => {
      expect(response.body.message.length).to.be.eq(2);
      expect(response.body.message[0]).to.be.eq("email must be an email");
      expect(response.body.message[1]).to.be.eq(
        "phoneNumber must be a valid phone number"
      );
      expect(response.status).to.be.eq(400);
    });
  }
);

When("valid credentials are sent as a request body", () => {
  const randomFirstName = faker.name.firstName();
  const randomLastName = faker.name.lastName();
  var randomEmailAddress = faker.internet.email();
  const randomPhoneNumber = faker.phone.number("50345####");
  const randomPassword = faker.internet.password(10);
  req = postRegistrationRequest(
    randomFirstName,
    randomLastName,
    randomEmailAddress,
    randomPassword,
    randomPhoneNumber
  );
});

Then("the status code should be 201", () => {
  req.should((response) => {
    expect(response.body.accountId).exist;
    expect(response.status).to.be.eq(201);
  });
});
