 - automated E2E test suite for https://magento.nublue.co.uk/
 - implemented using Typescript/Playwright 

prerequisites:
1) nvm
2) node
3) git

project setup:
1) run git clone https://github.com/pablohassan1/playwright-task.git from the command line
2) run npm install in the cloned directory

run tests:
- it is recommended to run only on one browser at a time to prevent flakyness

1) headed mode:
- npm run test:ch:headed
- npm run test:fi:headed
- npm run test:web:headed

2) headless mode:
- npm run test:ch:headless
- npm run test:fi:headless
- npm run test:web:headless

test specs:
./tests

page object model:
./pages
./page-objects

helper queries:
./helper


