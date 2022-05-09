import {
  ERROR_MESSAGES,
  MAX_CAR_NAME_LENGTH,
  MAX_RACING_COUNT,
  MIN_CAR_NAME_LENGTH,
} from '../constants.js';
import ValidationResult from './validation-result.js';

const isNumber = (num) => {
  // 숫자인지 확인
  return /^-?[0-9]+$/g.test(num);
};

export const validateCarNames = (carNames) => {
  // 자동차 이름 검증
  if (!carNames) {
    // 자동차 이름이 빈 값이라면
    return new ValidationResult(true, ERROR_MESSAGES.EMPTY_CAR_NAME);
  }
  const carNameList = carNames.split(',').map((carName) => carName.trim());
  // ,을 기준으로 자름
  // trim으로 문자열 좌우 공백 제거
  for (let i = 0; i < carNameList.length; i += 1) {
    const carName = carNameList[i];
    if (carName.length < MIN_CAR_NAME_LENGTH) {
      // 자동차 이름 길이가 1보다 작은 경우 에러 발생
      return new ValidationResult(true, ERROR_MESSAGES.FALL_SHORT_OF_MIN_CAR_NAME_LENGTH);
    }
    if (carName.length > MAX_CAR_NAME_LENGTH) {
      // 자동차 이름 길이가 5보다 클 경우 에러 발생
      return new ValidationResult(true, ERROR_MESSAGES.BEYOND_MAX_CAR_NAME_LENGTH);
    }
  }

  const isDuplicated = new Set(carNameList).size !== carNameList.length;
  if (isDuplicated) {
    // 중복되는 자동차 이름이 있을 경우 에러 발생
    return new ValidationResult(true, ERROR_MESSAGES.DUPLICATED_CAR_NAME);
  }
  return new ValidationResult(false);
  // 정상 return
};

export const validateRacingCount = (racingCount) => {
  // 시도 횟수 검증
  if (racingCount === '') {
    // 시도 횟수가 빈 값이라면
    return new ValidationResult(true, ERROR_MESSAGES.EMPTY_RACING_COUNT);
  }
  if (!isNumber(racingCount)) {
    // 시도 횟수가 숫자가 아니라면
    return new ValidationResult(true, ERROR_MESSAGES.TYPE_MISMATCH_OF_RACING_COUNT);
  }
  if (racingCount <= 0) {
    // 시도 횟수가 0이하일 경우
    return new ValidationResult(true, ERROR_MESSAGES.FALL_SHORT_OF_MIN_RACING_COUNT);
  }
  if (racingCount > MAX_RACING_COUNT) {
    // 시도 횟수가 100회를 넘는 경우
    return new ValidationResult(true, ERROR_MESSAGES.BEYOND_MAX_RACING_COUNT);
  }
  return new ValidationResult(false);
  // 정상 return
};
