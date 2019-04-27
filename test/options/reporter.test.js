'use strict';

const ValidationError = require('schema-utils/src/ValidationError');
const webpack = require('webpack');
const Server = require('../../lib/Server');
const config = require('../fixtures/simple-config/webpack.config');

describe('Validation', () => {
  let compiler;
  let server;

  beforeAll(() => {
    compiler = webpack(config);
  });

  describe('reporter', () => {
    beforeEach(() => {
      server = null;
    });
    afterEach((done) => {
      if (server) {
        server.close(() => {
          done();
        });
      } else {
        done();
      }
    });

    it('should allow reporter to be a function', () => {
      let error = null;
      try {
        const reporter = () => {};
        server = new Server(compiler, { reporter });
      } catch (err) {
        error = err;
      }
      expect(error).toBe(null);
    });

    it('should not allow reporter to be the wrong type', () => {
      let error = null;
      try {
        server = new Server(compiler, { reporter: '' });
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(ValidationError);
    });
  });
});