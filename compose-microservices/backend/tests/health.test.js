const request = require("supertest");
const app = require("../server");
describe("Health endpoint",() =>{
test("GET /health should return 200" , async () =>{
const response = await request(app).get("/health");
expect(response.statusCode).toBe(200);
expect(response.body.status).toBe("UP");
});
test("GET /db should connect to postgreSQL", async () => {
const response = await request(app).get("/db");
expect(response.statusCode).toBe(200);
expect(response.body.database).toBe("connected");
});
});
