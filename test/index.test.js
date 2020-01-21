const chai = require("chai");
const request = require("supertest");
const http = require("chai-http");
const server = require("../server");
const config = require("config");
chai.use(http);
const expect = chai.expect;
