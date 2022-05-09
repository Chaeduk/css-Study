import {
  ERROR_MESSAGES,
  MAX_CAR_NAME_LENGTH,
  MAX_RACING_COUNT,
  MIN_CAR_NAME_LENGTH,
} from '../constants.js';
import ValidationResult from './validation-result.js';

const isNumber = (num) => {
  return /^-?[0-9]+$/g.test(num);
};

export const validateCarNames = (carNames) => {
  // 자동차 이름 검증
  if (!carNames) {
    // 자동차 이름이 빈 값이라면
    return new ValidationResult(true, ERROR_MESSAGES.EMPTY_CAR_NAME);
  }
  const carNameList = carNames.split(',').map((carName) => carName.trim());
  for (let i = 0; i < carNameList.length; i += 1) {
    const carName = carNameList[i];
    if (carName.length < MIN_CAR_NAME_LENGTH) {
      return new ValidationResult(true, ERROR_MESSAGES.FALL_SHORT_OF_MIN_CAR_NAME_LENGTH);
    }
    if (carName.length > MAX_CAR_NAME_LENGTH) {
      return new ValidationResult(true, ERROR_MESSAGES.BEYOND_MAX_CAR_NAME_LENGTH);
    }
  }

  const isDuplicated = new Set(carNameList).size !== carNameList.length;
  if (isDuplicated) {
    return new ValidationResult(true, ERROR_MESSAGES.DUPLICATED_CAR_NAME);
  }
  return new ValidationResult(false);
};

export const validateRacingCount = (racingCount) => {
  if (racingCount === '') {
    return new ValidationResult(true, ERROR_MESSAGES.EMPTY_RACING_COUNT);
  }
  if (!isNumber(racingCount)) {
    return new ValidationResult(true, ERROR_MESSAGES.TYPE_MISMATCH_OF_RACING_COUNT);
  }
  if (racingCount <= 0) {
    return new ValidationResult(true, ERROR_MESSAGES.FALL_SHORT_OF_MIN_RACING_COUNT);
  }
  if (racingCount > MAX_RACING_COUNT) {
    return new ValidationResult(true, ERROR_MESSAGES.BEYOND_MAX_RACING_COUNT);
  }
  return new ValidationResult(false);
};
