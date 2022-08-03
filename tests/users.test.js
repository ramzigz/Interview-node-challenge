/* eslint-disable no-undef */
import dotenv from 'dotenv';

import { expect } from 'chai';
import supertest from 'supertest';

import app from '../src/app.js';
const request = supertest(app);

dotenv.config({ path: '.env' });

let userId = null;

describe("GET /api/v1/users", function () {
  it("returns all users", async function () {
    const response = await request.get("/api/v1/users");

    expect(response.status).to.eql(200);
  });
});

describe("POST /api/v1/users", function () {
  it("allows create a new user", async function () {
    const response = await request.post("/api/v1/users").send({
      first_name: 'Tom',
      last_name: 'Cruise',
      age: 51,
      email: 'tom123@gmail.com',
      password: 'remember',
    });

    expect(response.status).to.eql(201);
    expect(response.body.data.user.full_name).to.eql("Tom Cruise");
    expect(response.body.data.user.age).to.eql(51);
    userId = response.body.data.user.id;

  });

  it("requires different email, user with given email exist", async function () {
    const response = await request.post("/api/v1/users").send({
      first_name: 'Tom',
      last_name: 'Cruise',
      age: 51,
      email: 'tom123@gmail.com',
      password: 'remember',
    });

    expect(response.status).to.eql(400);
  });
});

describe("PUT /api/v1/users/:id", function () {
  it("allows update a user", async function () {
    const response = await request
      .put(`/api/v1/users/${userId}`)
      .send({
        first_name: 'Tom',
        last_name: 'Hanks',
        age: 33,
        email: 'tom123@gmail.com',
        password: 'remember',
      });

    expect(response.status).to.eql(200);
    expect(response.body.data.user.full_name).to.eql("Tom Hanks");
    expect(response.body.data.user.age).to.eql(33);
  });
});

describe("DELETE /api/v1/users/:id", function () {
  it("allows delete a user", async function () {
    // Check that a user can delete the created favorite.
    const response = await request
      .delete(`/api/v1/users/${userId}`)

    expect(response.status).to.eql(204);

    // Verify that the record was deleted.
    const getResponse = await request
      .get(`/api/v1/users/${userId}`)

    expect(getResponse.status).to.eql(404);
  });
});