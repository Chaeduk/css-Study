const setIntervalX = ({ times, delay, before, after, end }) => {
  if (!times) {
    // times가 0이면 end
    end && end();
    return;
  }
  before && before();
  setTimeout(() => {
    after && after();
    setIntervalX({
      times: times - 1,
      delay,
      before,
      after,
      end,
    });
  }, delay);
};
// 재귀함수

export default setIntervalX;
