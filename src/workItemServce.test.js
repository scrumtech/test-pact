import * as wrapper from '@pact-foundation/pact-node';
import path from 'path';
import request from 'superagent';
import {default as Pact} from 'pact';
import chai, {expect} from 'chai';
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
wrapper.logLevel('debug');

describe.only('test pact', (done) => {
  // this.timeout(30000);
  // create mock server to listen on port 1234
  const PROTOCOL = 'http';
  const MOCK_PORT = 9000;
  const PROVIDER_URL = `${PROTOCOL}://localhost:${MOCK_PORT}`;
  const mockServer = wrapper.createServer({
    port: 9000,
    //host: '127.0.0.1',
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    ssl: PROTOCOL === 'https',
    spec: 2
  });
  const EXPECTED_BODY = [{
    id: 1,
    name: 'Project 1',
    due: '2016-02-11T09:46:56.023Z',
    tasks: [
      {id: 1, name: 'Do the laundry', 'done': true},
      {id: 2, name: 'Do the dishes', 'done': false},
      {id: 3, name: 'Do the backyard', 'done': false},
      {id: 4, name: 'Do nothing', 'done': false}
    ]
  }];

  let provider, counter = 1;

  after(() => {
    wrapper.removeAllServers();
  });

  beforeEach(done => {
   mockServer.start().then(() => {
      console.log('STARTED');
      provider = Pact({consumer: `Consumer ${counter}`,
                       provider: `Provider ${counter}`,
                       port: MOCK_PORT,
                       ssl: PROTOCOL === 'https'
                      });
      done();
   });
  });

  afterEach((done) => {
   mockServer.delete().then(() => {
     counter++;
     done();
   });
  });

  context('with a single request', () => {

    // add interactions, as many as needed
    beforeEach((done) => {
      provider.addInteraction({
        state: 'i have a list of projects',
        uponReceiving: 'a request for projects',
        withRequest: {
          method: 'get',
          path: '/projects',
          headers: {'Accept': 'application/json'}
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: EXPECTED_BODY
        }
      }).then(() => done());
    });

    // once test is run, write pact and remove interactions
    afterEach((done) => {
      provider.finalize().then(() => done());
    });

    // execute your assertions
    it('successfully verifies', (done) => {
      // expect(true).to.be.true;
      const verificationPromise = request
        .get(`${PROVIDER_URL}/projects`)
        .set({'Accept': 'application/json'})
        .then(provider.verify);
      expect(verificationPromise).to.eventually.eql(JSON.stringify(EXPECTED_BODY)).notify(done);
    });
  });
});
