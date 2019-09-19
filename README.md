# testcafe-browser-provider-dappeteer

This is the **dappeteer** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

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
