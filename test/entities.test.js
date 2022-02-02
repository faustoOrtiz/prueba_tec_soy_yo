const request = require("supertest");
const app = require("../src/app");

describe("POST /entities/filter", () => {
    it(" should  with 200 Status code List of entities", done => {
        request(app)
            .post("/entities/filter")
            .send({ startId: 1, endId: 3 }) //startId = 1 & endId = 3
            .set("Accept", "application/json")
            .expect("content-Type", "application/json; charset=utf-8")
            .expect(200)
            .end(error => {
                if (error) return done(error);
                done();
            })
    })

    it("should  with 404 not found for specified range", done => {
        request(app)
            .post("/entities/filter")
            .send({ startId: 2, endId: 1 }) // startId > endId
            .set("Accept", "application/json")
            .expect("content-Type", "application/json; charset=utf-8")
            .expect(404)
            .end(error => {
                if (error) return done(error);
                done();
            })
    })

    it("should  with 404 Do not give rank values ", done => {
        request(app)
            .post("/entities/filter")
            .send({}) // not startdId & not endId
            .set("Accept", "application/json")
            .expect("content-Type", "application/json; charset=utf-8")
            .expect(404)
            .end(error => {
                if (error) return done(error);
                done();
            })
    })
})