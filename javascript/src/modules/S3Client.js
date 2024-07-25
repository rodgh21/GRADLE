'use strict'

const { S3 } = require('aws-sdk');
const { local, log, info, error } = require("../logger");
const localS3 = local.extend('s3');
const logS3 = log.extend('S3');
const debugS3 = info.extend('S3');
const errorS3 = error.extend('S3');

class S3Client {
  #s3
  #sourceBucket
  #targetBucket
  #sourceKey
  #targetKey

  constructor(sourceBucket , sourceKey, targetBucket, targetKey) {
    this.#s3 = new S3({ apiVersion: "2006-03-01" });
    this.#sourceBucket = sourceBucket
    this.#sourceKey = sourceKey
    this.#targetBucket = targetBucket
    this.#targetKey = targetKey

    localS3(this.#sourceBucket, this.#sourceKey, this.#targetBucket, this.#targetKey)
  }

  copyObject() {
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: this.#targetBucket,
        CopySource: encodeURI(`/${this.#sourceBucket}/${this.#sourceKey}`),
        Key: this.#targetKey
      }
      this.#s3.copyObject(params).promise()
      .then(data => {
        debugS3("successfully copied: ", data)
        resolve(data)
      })
      .catch(reject);
    });
  }

  deleteObject() {
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: this.#sourceBucket,
        Key: this.#sourceKey
      }
      this.#s3.deleteObject(params).promise()
      .then(_ => {
        debugS3("successfully deleted:", this.#sourceKey)
        resolve();
      })
      .catch(reject);
    });
  }
}

module.exports = S3Client;
