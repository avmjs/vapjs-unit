/*
Primary Attribution
Richard Moore <ricmoo@me.com>
https://github.com/ethers-io

Note, Richard is a god of vapor gods. Follow and respect him, and use Vapers.io!
*/

const BN = require('bn.js');
const numberToBN = require('number-to-bn');

const zero = new BN(0);
const negative1 = new BN(-1);

// complete vapory unit map
const unitMap = {
  'novapor':      '0', // eslint-disable-line
  'wei':          '1', // eslint-disable-line
  'kwei':         '1000', // eslint-disable-line
  'Kwei':         '1000', // eslint-disable-line
  'babbage':      '1000', // eslint-disable-line
  'femtovapor':   '1000', // eslint-disable-line
  'mwei':         '1000000', // eslint-disable-line
  'Mwei':         '1000000', // eslint-disable-line
  'lovelace':     '1000000', // eslint-disable-line
  'picovapor':    '1000000', // eslint-disable-line
  'gwei':         '1000000000', // eslint-disable-line
  'Gwei':         '1000000000', // eslint-disable-line
  'shannon':      '1000000000', // eslint-disable-line
  'nanovapor':    '1000000000', // eslint-disable-line
  'nano':         '1000000000', // eslint-disable-line
  'szabo':        '1000000000000', // eslint-disable-line
  'microvapor':   '1000000000000', // eslint-disable-line
  'micro':        '1000000000000', // eslint-disable-line
  'finney':       '1000000000000000', // eslint-disable-line
  'millivapor':   '1000000000000000', // eslint-disable-line
  'milli':        '1000000000000000', // eslint-disable-line
  'vapor':        '1000000000000000000', // eslint-disable-line
  'kvapor':       '1000000000000000000000', // eslint-disable-line
  'grand':        '1000000000000000000000', // eslint-disable-line
  'mvapor':       '1000000000000000000000000', // eslint-disable-line
  'gvapor':       '1000000000000000000000000000', // eslint-disable-line
  'tvapor':       '1000000000000000000000000000000', // eslint-disable-line
};

/**
 * Returns value of unit in Wei
 *
 * @method getValueOfUnit
 * @param {String} unit the unit to convert to, default vapor
 * @returns {BigNumber} value of the unit (in Wei)
 * @throws error if the unit is not correct:w
 */
function getValueOfUnit(unitInput) {
  const unit = unitInput ? unitInput.toLowerCase() : 'vapor';
  var unitValue = unitMap[unit]; // eslint-disable-line

  if (typeof unitValue !== 'string') {
    throw new Error(`[vapjs-unit] the unit provided ${unitInput} doesn't exists, please use the one of the following units ${JSON.stringify(unitMap, null, 2)}`);
  }

  return new BN(unitValue, 10);
}

function numberToString(arg) {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(`while converting number to string, invalid number value '${arg}', should be a number matching (^-?[0-9.]+).`);
    }
    return arg;
  } else if (typeof arg === 'number') {
    return String(arg);
  } else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    } else { // eslint-disable-line
      return arg.toString(10);
    }
  }
  throw new Error(`while converting number to string, invalid number value '${arg}' type ${typeof arg}.`);
}

function fromWei(weiInput, unit, optionsInput) {
  var wei = numberToBN(weiInput); // eslint-disable-line
  var negative = wei.lt(zero); // eslint-disable-line
  const base = getValueOfUnit(unit);
  const baseLength = unitMap[unit].length - 1 || 1;
  const options = optionsInput || {};

  if (negative) {
    wei = wei.mul(negative1);
  }

  var fraction = wei.mod(base).toString(10); // eslint-disable-line

  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }

  if (!options.pad) {
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  }

  var whole = wei.div(base).toString(10); // eslint-disable-line

  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  var value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`; // eslint-disable-line

  if (negative) {
    value = `-${value}`;
  }

  return value;
}

function toWei(vaporInput, unit) {
  var vapor = numberToString(vaporInput); // eslint-disable-line
  const base = getValueOfUnit(unit);
  const baseLength = unitMap[unit].length - 1 || 1;

  // Is it negative?
  var negative = (vapor.substring(0, 1) === '-'); // eslint-disable-line
  if (negative) {
    vapor = vapor.substring(1);
  }

  if (vapor === '.') { throw new Error(`[vapjs-unit] while converting number ${vaporInput} to wei, invalid value`); }

  // Split it into a whole and fractional part
  var comps = vapor.split('.'); // eslint-disable-line
  if (comps.length > 2) { throw new Error(`[vapjs-unit] while converting number ${vaporInput} to wei,  too many decimal points`); }

  var whole = comps[0], fraction = comps[1]; // eslint-disable-line

  if (!whole) { whole = '0'; }
  if (!fraction) { fraction = '0'; }
  if (fraction.length > baseLength) { throw new Error(`[vapjs-unit] while converting number ${vaporInput} to wei, too many decimal places`); }

  while (fraction.length < baseLength) {
    fraction += '0';
  }

  whole = new BN(whole);
  fraction = new BN(fraction);
  var wei = (whole.mul(base)).add(fraction); // eslint-disable-line

  if (negative) {
    wei = wei.mul(negative1);
  }

  return new BN(wei.toString(10), 10);
}

module.exports = {
  unitMap,
  numberToString,
  getValueOfUnit,
  fromWei,
  toWei,
};
