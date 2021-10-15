'use strict';

const output = {
  hello: (req, res) => {
    res.end(`<body>Hello C World!!!!!!</body>`);
  },

  test: (req, res) => {
    console.log('/test start');
    res.json(`Good Job!`);
  },
};

export { output };
