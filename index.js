import { range } from './jsutils/index';

const { sqrt, PI, exp, log, floor, ceil } = Math;
const harmonicNumber = (n, m = 1) => range(n).reduce((prev, curr) => prev + 1 / (curr + 1) ** m, 0);


export const normal = ({ mean = 0, variance = 1 } = {}) => function normal(x) {
  return exp(-((x - mean) ** 2) / (2 * variance)) / sqrt(2 * variance * PI);
};

export const symmetricNormalBimodal = ({ xs = [0], mean = 0, variance = 1 } = {}) =>
  function symmetricNormalBimodal(x) {
    return (
      normal({ mean, variance })(x) +
      normal({ mean: xs[xs.length - 1] - mean, variance })(x)
    ) / 2;
  };
export const symmetricNormalTrimodal = ({ xs = [0], mean = 0, variance = 1 } = {}) =>
  function symmetricNormalTrimodal(x) {
    return (
      normal({ mean, variance })(x) +
      normal({ mean: xs[xs.length - 1] / 2, variance })(x) +
      normal({ mean: xs[xs.length - 1] - mean, variance })(x)
    ) / 3;
  };
export const logNormal = ({ mean = 0, variance = 1 } = {}) => function logNormal(x) {
  return exp(-((log(x) - mean) ** 2) / (2 * variance)) / x / sqrt(variance * 2 * PI);
};

export const zipf = ({ s = 1 } = {}) => function zipf(x) {
  return 1 / (x + 1) ** s / harmonicNumber(x + 1);
};
export const uniform = ({ count = 1 } = {}) => function uniform(x) {
  return 1 / count;
};

export const uniformMultimodal = ({ defaultValue = 0, modes = [{value: 1, condition: (n => n%2)}]  } = {}) => function uniformMultimodal(x, ...rest) {
  let match = modes.find(mode => mode.condition(x, ...rest));
  return match ? match.value : defaultValue;
};

export const uniformRegularMultimodal = ({ count = 1, modes = [1, 2, 3] } = {}) => function uniformMultimodal(x) {
  return modes[floor(x / (count / modes.length))];
};
