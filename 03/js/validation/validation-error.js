import { VALIDATION_ERROR_NAME } from '../constants.js';

class ValidationError extends Error {
  // Error를 상속받음
  constructor(message) {
    super(message);
    this.name = VALIDATION_ERROR_NAME;
  }
}

export default ValidationError;
