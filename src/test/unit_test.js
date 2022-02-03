
const app = require("../src/app");
const request = require("supertest");

it("Should  with 200 status list of entities", done => {
    request(app).post("/entities/filter").
              send({ startId: 1, endId: 2 }) 
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
        .end(error => {
            if (error) return done(error);
            done();
        })
})

it("Should with 404 not found specified range", done => {
    request(app).post("/entities/filter")
        .send({ startId: 2, endId: 1 }) 
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(error => {
            if (error) return done(error);
            done();
        })
})

it("Should  with 404 not values ", done => {
    request(app)
        .post("/entities/filter")
        .send({}) 
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(error => {
            if (error) return done(error);
            done();
        })
})