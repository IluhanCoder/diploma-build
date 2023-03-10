// const app = require('../index')
// const chai = require('chai')
// const chaiHttp = require('chai-http')

// const should = chai.should()
// const expect = chai.expect()

// chai.use(chaiHttp)

// describe('TESTING A USER CONTROLLER', () => {
//     let userId = null

//     describe('Test GET /api/users', () => {
//         it('It should GET users from database', (done) => {
//             chai.request(app)
//                 .get("/api/users")
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('array')
//                     res.body[0].should.be.a('object')
//                     done()
//                 })
//         })
//     });

//     describe('Test POST /api/registrarion', () => {
//         it('It should POST a valid user', (done) => {
//             let user = {
//                 login: "TestLogin",
//                 email: "TestEmail@gmail.com",
//                 password: "testPassword123",
//                 birthday: new Date(),
//                 cell: "+380637444444",
//                 city: "TestCity",
//                 gender: "TestGender",
//                 avatar: "TestAvatar",
//                 isActivated: true,
//                 activationLink: "testLink"
//             }

//             chai.request(app)
//                 .post("/api/registration")
//                 .send(user)
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('object')
//                     userId = res.body._id
//                     done()
//                 })
//         })
//     });

//     describe('Test DELETE /api/user', () => {
//         it('It should DELETE a user', (done) => {
//             console.log(`A user id is: ${userId}`)
//             chai.request(app)
//                 .delete("/api/user/" + userId)
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('object')
//                     done()
//                 })
//         })
//     });
// })

// describe('TESTING AN EVENTS CONTROLLER', () => {
//     describe('Test GET /api/events', () => {
//         it('It should GET events from database', (done) => {
//             chai.request(app)
//                 .get("/api/events")
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('array')
//                     res.body[0].should.be.a('object')
//                     done()
//                 })
//         })
//     });

//     describe('Test POST /api/events', () => {
//         it('It should POST a valid event', (done) => {
//             let event = {
//                 name: "TestEvent",
//                 creator: "TestCreator",
//                 desc: "TestDescription",
//                 genres: ["TestGenre1", "TestGenre2"],
//                 date: "TestDate",
//                 adress: "TestAdress",
//                 participants: ["TestParticipant1", "TestParticipant2"],
//                 avatar: "TestAvatar"
//             }

//             chai.request(app)
//                 .post("/api/events")
//                 .send(event)
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     done()
//                 })
//         })
//     });
// })
