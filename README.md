# testcafe-browser-provider-dappeteer

This is the **dappeteer** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## WIP
Feel free to contribute to this project. We want to be able to do clean end to end testing for Ethereum. Testcafe and dappeteer seems a good way to achieve this goal. A better testcafe provider will be the first step :) 

## Install

```
npm install testcafe-browser-provider-dappeteer
```

## Usage


You can determine the available browser aliases by running
```
testcafe -b dappeteer
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe dappeteer 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('dappeteer')
    .run();
```

## Author
Romain Gardet
