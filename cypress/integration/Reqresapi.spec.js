describe("ReqResAPItesting", () => {
  Cypress.config("baseUrl", "https://reqres.in/");

  beforeEach(() => {
    cy.request("/api/users/2").as("anu");
  });

  it("Validate the header", () => {
    cy.get("@anu")
      .its("headers")
      .its("content-type")
      .should("include", "application/json; charset=utf-8");
  });

  it("Validate the status code", () => {
    cy.get("@anu").its("status").should("equal", 200);
  });

  it("should return the number of users", () => {
    cy.request("api/users?page=2").then((response) => {
      expect(response.body).to.not.be.null;
      expect(response.body.data).to.have.lengthOf(6);
    });
  });

  it("GET - read", () => {
    cy.request("/api/users/2").then((response) => {
      expect(response).to.have.property("status", 200);
      expect(response).to.have.property("statusText", "OK");
      expect(response.body).to.not.be.null;
      expect(response.body.data).to.not.be.null;
      expect(response.duration).to.not.be.null;
    });
  });

  it("POST - create", () => {
    const details = {
      name: "Anusha",
      job: "Software",
    };
    cy.request("POST", "/api/users", details)
      .its("body")
      .should("include", { name: "Anusha" });
  });

  it("PUT - update", () => {
    const details = {
      name: "Venkata",
    };
    cy.request("PUT", "/api/users/2", details);
  });

  it("PATCH - update", () => {
    const details = {
      job: "Test Engineer",
    };
    cy.request("PATCH", "/api/users/2", details);
  });

  it("DELETE - remove", () => {
    const details = {
      name: "Anusha",
      job: "Software",
    };
    cy.request("DELETE", "/api/users/2", details)
      .its("status")
      .should("eq", 204);
  });
});
