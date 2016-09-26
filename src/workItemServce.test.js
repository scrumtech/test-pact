import * as wrapper from '@pact-foundation/pact-node';
import path from 'path';
import {default as Pact} from 'pact';
import chai, {expect} from 'chai';
import chaiAsPromised from "chai-as-promised";
import {createWorkItem} from "./workItemService.js"

chai.use(chaiAsPromised);
wrapper.logLevel('debug');

describe.only('work item service', (done) => {
  // this.timeout(30000);
  // create mock server to listen on port 1234
  const PROTOCOL = 'http';
  const MOCK_PORT = 9000;
  const PROVIDER_URL = `${PROTOCOL}://localhost:${MOCK_PORT}`;
  const mockServer = wrapper.createServer({
    port: 9000,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    ssl: PROTOCOL === 'https',
    spec: 2
  });

  let provider, counter = 1;

  after(() => {
    wrapper.removeAllServers();
  });

  beforeEach(function(done) {
    this.timeout(30000);
    mockServer.start().then(() => {
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

  context('with a valid work item', () => {
    const DATA = {
      queue : 'oshc_eap@nib.com.au',
      body  : 'this is some data to put into the e5 work item'
    };

    const EXPECTED_RESPONSE = {
      id: 1
    };
    // add interactions, as many as needed
    beforeEach((done) => {
      provider.addInteraction({
        state: 'i have a list of projects',
        uponReceiving: 'a request to create a work item',
        withRequest: {
          method: 'post',
          path: '/projects',
          headers: {'Content-Type': 'application/json'},
          body: { applicationId: '1nib', body: DATA}
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: EXPECTED_RESPONSE
        }
      }).then(() => done());
    });

    // once test is run, write pact and remove interactions
    afterEach(() => {
      return provider.finalize();
    });

    // execute your assertions
    it('work item responds with a success', (done) => {
      const reqPromise = createWorkItem(`${PROVIDER_URL}/projects`, DATA)
        .then((resp) => {
          console.log('Response: ', JSON.stringify(resp));
          return provider.verify(JSON.stringify(resp));
        });
      reqPromise.then(r => console.log('Value ', r));
      expect(reqPromise).to.eventually.eql(JSON.stringify(EXPECTED_RESPONSE)).notify(done);
    });
  });

  context('with an invalid work item', () => {

  });
});
