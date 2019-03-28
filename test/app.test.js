const should = require('chai').should();
const expect = require('chai').expect;
const nock = require('nock');
const app = require('../app.js');

describe('ExtractCatNamesFromAPI Test', function() {

  beforeEach(function(done){
    nock('http://agl-developer-test.azurewebsites.net')
    .get('/people.json')
    .reply(200, [
      {
          "name": "Bob",
          "gender": "Male",
          "age": 23,
          "pets": [
              {
                  "name": "Garfield",
                  "type": "Cat"
              },
              {
                  "name": "Fido",
                  "type": "Dog"
              }
          ]
      },
      {
          "name": "Jennifer",
          "gender": "Female",
          "age": 18,
          "pets": [
              {
                  "name": "Garfield",
                  "type": "Cat"
              }
          ]
      },
      {
          "name": "Steve",
          "gender": "Male",
          "age": 45,
          "pets": null
      },
      {
          "name": "Fred",
          "gender": "Male",
          "age": 40,
          "pets": [
              {
                  "name": "Tom",
                  "type": "Cat"
              },
              {
                  "name": "Sam",
                  "type": "Dog"
              }
          ]
      }
    ]);
    done();
  })

  it('Invalid API should give error', function(done) {
    app.extractCatNamesFromAPI("http://dfds",(err,catNames)=>{
      should.exist(err);
      done();
    });
  });

  it('Valid API should give catNames', function(done) {
    app.extractCatNamesFromAPI("http://agl-developer-test.azurewebsites.net/people.json",(err,catNames)=>{
      should.not.exist(err);
      should.exist(catNames);
      done();
    });
  });

  it('Should have catNames for male and female', function(done) {
    app.extractCatNamesFromAPI("http://agl-developer-test.azurewebsites.net/people.json",(err,catNames)=>{
      should.not.exist(err);
      should.exist(catNames.male);
      should.exist(catNames.female);
      done();
    });
  });

  it('Should have 2 catNames for male', function(done) {
    app.extractCatNamesFromAPI("http://agl-developer-test.azurewebsites.net/people.json",(err,catNames)=>{
      should.not.exist(err);
      console.log(catNames);
      expect(catNames.male.length).to.equal(2);
      done();
    });
  });

  it('Should have 1 catNames for female', function(done) {
    app.extractCatNamesFromAPI("http://agl-developer-test.azurewebsites.net/people.json",(err,catNames)=>{
      should.not.exist(err);
      console.log(catNames);
      expect(catNames.female.length).to.equal(1);
      done();
    });
  });


});