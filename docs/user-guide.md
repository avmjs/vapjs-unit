# User Guide

All information for developers using `vapjs-unit` should consult this document.

## Install

```
npm install --save vapjs-unit
```

## Usage

```js
const unit = require('vapjs-unit');

var val1 = unit.toWei(249824778, 'vapor');

// result <BN ...> 249824778000000000000000000

var val2 = unit.fromWei('7282837', 'vapor');

// result '0.00000000000000007282837'
});
```

## API Design

### toWei

[index.js:vapjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a single Vapory denominated value at a specified unit, and convert it to its `wei` value. Intakes a `value` and `unit` specifier, outputs a single wei value `BN` object.

**Parameters**

-   `value` **Object|Number|String** a single number `wei` value as a integer, BN.js object instance, string hex integer, BN.js object instance (no decimals)
-   `unit` **String** the unit to covert to (i.e. `finney`, `vapor` etc..)

Result output single BN **Object**.

```js
const unit = require('vapjs-unit');

var val1 = unit.toWei(249824778, 'vapor');

// result <BN ...> [.toString(10) : 249824778000000000000000000]
```

### fromWei

[index.js:vapjs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a wei denominated value into another Vapory denomination. Intakes a single wei `value` and outputs a BN object.

**Parameters**

-   `value` **Object|Number|String** a single number Vapory denominated value
-   `unit` **String** the unit to covert to (i.e. `finney`, `vapor` etc..)

Result output single **String** number.

```js
const unit = require('vapjs-unit');

var val1 = unit.fromWei(249824778000000000000000000, 'vapor');

// result '249824778'
```

## Supported Units

```
'wei':          '1',
'kwei':         '1000',
'Kwei':         '1000',
'babbage':      '1000',
'femtovapor':   '1000',
'mwei':         '1000000',
'Mwei':         '1000000',
'lovelace':     '1000000',
'picovapor':    '1000000',
'gwei':         '1000000000',
'Gwei':         '1000000000',
'shannon':      '1000000000',
'nanovapor':    '1000000000',
'nano':         '1000000000',
'szabo':        '1000000000000',
'microvapor':   '1000000000000',
'micro':        '1000000000000',
'finney':       '1000000000000000',
'millivapor':   '1000000000000000',
'milli':        '1000000000000000',
'vapor':        '1000000000000000000',
'kvapor':       '1000000000000000000000',
'grand':        '1000000000000000000000',
'mvapor':       '1000000000000000000000000',
'gvapor':       '1000000000000000000000000000',
'tvapor':       '1000000000000000000000000000000'
```

## Why BN.js?

`vapjs` has made a policy of using `BN.js` across all of its repositories. Here are some of the reasons why:

  1. lighter than alternatives (BigNumber.js)
  2. faster than most alternatives, see [benchmarks](https://github.com/indutny/bn.js/issues/89)
  3. used by the Vapory foundation across all [`vaporyjs`](https://github.com/vaporycojs) repositories
  4. is already used by a critical JS dependency of many vapory packages, see package [`elliptic`](https://github.com/indutny/elliptic)
  5. purposefully **does not support decimals or floats numbers** (for greater precision), remember, the Vapory blockchain cannot and will not support float values or decimal numbers.

## A Note On Handling Numbers

If you want to handle **floats** or **decimal** numbers, `toWei` your values into their base integer wei values and do the operations (e.g. multiplying and dividing) with `BN.js`, then `fromWei` those values back into the desired denomination.

This is procedurally safer, more accurate and computationally faster than the alternative.

If you absolutely cannot do it this way, use a module like `BigNumber.js` which supports floats and decimals, but remember to convert everything back down to integer wei values when you send it to the chain.

Remember, the Vapory blockchain only supports integer hex number values at this time.

## Browser Builds

`vapjs` provides production distributions for all of its modules that are ready for use in the browser right away. Simply include either `dist/vapjs-unit.js` or `dist/vapjs-unit.min.js` directly into an HTML file to start using this module. Note, an `vapUnit` object is made available globally.

```html
<script type="text/javascript" src="vapjs-unit.min.js"></script>
<script type="text/javascript">
vapUnit(...);
</script>
```

Note, even though `vapjs` should have transformed and polyfilled most of the requirements to run this module across most modern browsers. You may want to look at an additional polyfill for extra support.

Use a polyfill service such as `Polyfill.io` to ensure complete cross-browser support:
https://polyfill.io/

## Latest Webpack Figures

```
Version: webpack 2.1.0-beta.15
Time: 1079ms
            Asset    Size  Chunks             Chunk Names
    vapjs-unit.js  154 kB       0  [emitted]  main
vapjs-unit.js.map  189 kB       0  [emitted]  main
    + 11 hidden modules

Version: webpack 2.1.0-beta.15
Time: 3622ms
            Asset     Size  Chunks             Chunk Names
vapjs-unit.min.js  69.7 kB       0  [emitted]  main
    + 11 hidden modules
```

## Other Awesome Modules, Tools and Frameworks

 - [web3.js](https://github.com/vaporyco/web3.js) -- the original Vapory swiss army knife **Vapory Foundation**
 - [vaporyjs](https://github.com/vaporycojs) -- critical vaporyjs infrastructure **Vapory Foundation**
 - [browser-solidity](https://vapory.github.io/browser-solidity) -- an in browser Solidity IDE **Vapory Foundation**
 - [wafr](https://github.com/silentcicero/wafr) -- a super simple Solidity testing framework
 - [truffle](https://github.com/ConsenSys/truffle) -- a solidity/js dApp framework
 - [embark](https://github.com/iurimatias/embark-framework) -- a solidity/js dApp framework
 - [dapple](https://github.com/nexusdev/dapple) -- a solidity dApp framework
 - [chaitherium](https://github.com/SafeMarket/chaithereum) -- a JS web3 unit testing framework
 - [contest](https://github.com/DigixGlobal/contest) -- a JS testing framework for contracts

## Our Relationship with Vapory & VaporyJS

 We would like to mention that we are not in any way affiliated with the Vapory Foundation or `vaporyjs`. However, we love the work they do and work with them often to make Vapory great! Our aim is to support the Vapory ecosystem with a policy of diversity, modularity, simplicity, transparency, clarity, optimization and extensibility.

 Many of our modules use code from `web3.js` and the `vaporyjs-` repositories. We thank the authors where we can in the relevant repositories. We use their code carefully, and make sure all test coverage is ported over and where possible, expanded on.
