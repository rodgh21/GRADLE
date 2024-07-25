'use strict'

const { SSM } = require("aws-sdk");
const { local, log, info, error } = require("../logger");
const localSSM = local.extend('SSM');
const logSSM = log.extend('SSM');
const debugSSM = info.extend('SSM');
const errorSSM = error.extend('SSM');

class SSMClient {
  #ssm
  #params
  #value

  constructor(name) {
    this.#ssm = new SSM();
    this.#params = {
      'Name': name
    }
  }

  getValue() {
    return new Promise((resolve, reject) => {
      this.#ssm.getParameter(this.#params).promise()
      .then(data => {
        debugSSM('get: ', data)
        this.#value = JSON.parse(data.Parameter.Value)
        resolve(this.#value);
      })
      .catch(err => {
        errorSSM(err.stack)
        reject(err);
      });
    });
  }

  setValue(data) {
    return new Promise((resolve, reject) => {
      let newParams = {
        ...this.#params,
        Value: JSON.stringify(data),
        Overwrite: true,
      }
      debugSSM('setParams: ', newParams)
      this.#ssm.putParameter(newParams).promise()
      .then(_ => {
        debugSSM('set: ', data)
        this.#value = data;
        resolve();
      })
      .catch(err => {
        errorSSM(err.stack)
        reject(err);
      });
    });
  }
}

module.exports = SSMClient;
