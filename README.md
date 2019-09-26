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

In your testing code :
```js
import { Selector } from 'testcafe'; 
import { getMetamask } from 'testcafe-browser-provider-dappeteer';

const default_mmemo = 'stumble story behind hurt patient ball whisper ...';

fixture `Connexion`
    .page `http://app.auctionity.com`
    .beforeEach( async t => {
        const metamask = await getMetamask(t);
        try {
          await metamask.lock()  // If user is not created, it will throw here, creating a new imported seed account
          console.log("Unlocking account...")
          await metamask.unlock();
        } catch (_error) {
          console.log("Creating an account...")
          // Import default mmemonic
          await metamask.importAccount(default_mmemo);
        }
        // Change network if you want
        //await metamask.switchNetwork('mainnet');
    });
    
 test('Use MM', async t => {
  const metamask = await getMetamaskInstance(t);
  const mintButton = await Selector('#mint');
  
  // Click to mint tokens
  await mintButton.click();

  // Click to confirm transaction at Metamask
  await metamask.confirmTransaction();
});

 ```

## Author
Romain Gardet
