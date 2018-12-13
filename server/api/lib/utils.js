'use strict';

module.exports = {
  asJSON: asJSON,
  options: options,
  cors: cors,
  Envelope: Envelope,
  Error: Error,
};

/**
 * Defaults and env variables
 */
var isLocal = process.env.LOCALHOST;

/**
 * Shared utility functions
 */

// Express middleware for JSON responses
function asJSON(req, res, next) {
  res = createCorsHeader(req, res);
  res.header('Content-Type', 'application/json');
  next();
}

// Express middleware for options requests
function options(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
}

// Express middleware for CORS headers
function cors(req, res, next) {
  res = createCorsHeader(req, res);
  next();
}

function createCorsHeader(req, res) {
  // Only allow specific CORS requests
  if (typeof req.headers !== 'undefined' && typeof req.headers.origin !== 'undefined') {
    if (req.headers.origin.indexOf('http://localhost:4000/') !== -1 ||
      req.headers.origin.indexOf('http://localhost:4000/') !== -1 ||
      (isLocal && req.headers.origin.indexOf('localhost') !== -1 && req.headers.host.indexOf('localhost') !== -1)) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
  }
  return res;
}

/**
 * Standard API response envelope
 * @param {String} message Message to attach to the API response
 * @param {Array} data     Payload of data to return to the client based on request
 */
function Envelope(message, data) {
  var env = {
    status: 'success'
  };

  if (message) {
    env.message = message;
  }

  if (data) {
    env.data = data;
  }

  return env;
}

/**
 * Standard API error response
 * @param {String || Object} message Simple error message, or in-depth error response
 */
function Error(message) {
  return {
    status: 'error',
    message: message
  };
}

