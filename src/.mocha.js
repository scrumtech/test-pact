import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.expect = expect;
global.sinon = sinon;

beforeEach(function(done) {
    this.timeout(30000); // A very long environment setup.
    // setTimeout(done, 2500);
  });
