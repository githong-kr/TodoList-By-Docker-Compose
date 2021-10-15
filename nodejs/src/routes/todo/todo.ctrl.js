'use strict';
import maria from '../../bin/common/maria.js';

const output = {
  select: async (req, res) => {
    let result;
    let id = req.query.id;

    if (!id) {
      result = await maria.allSelect();
    } else {
      result = await maria.oneSelect(id);
    }

    res.json(result);
  },

  insert: async (req, res) => {
    let result;
    let text = req.body.text;
    let color = req.body.color;

    if (!text || !color) {
      console.log(`error`);
    } else {
      result = await maria.insert(text, color);
    }

    res.json(`test`);
  },

  delete: async (req, res) => {
    let result;
    let id = req.body.id;
    if (!id) {
      console.log(`error`);
    } else {
      result = await maria.remove(id);
    }

    res.json(`test`);
  },

  update: async (req, res) => {
    let result;
    let procDvcd = req.body.procDvcd;
    let id = req.body.id;
    let text = req.body.text;
    let color = req.body.color;
    let checked = req.body.checked;

    if (procDvcd !== '1' && procDvcd !== '2') {
      throw new Error();
    }

    let selectResult = await maria.oneSelect(id);

    if (procDvcd === '1') {
      text = text === selectResult[0].text ? selectResult[0].text : text;
      color = color === selectResult[0].color ? selectResult[0].color : color;
      checked = selectResult[0].checked;
    } else if (procDvcd === '2') {
      text = selectResult[0].text;
      color = selectResult[0].color;
      checked = (parseInt(checked) + 1) % 2;
    }

    result = await maria.update(id, text, color, checked);

    console.log(result);
    res.json(`test`);
  },
};

export { output };
