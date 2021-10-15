import mariadb from 'mariadb';

let pool;

const init = async () => {
  pool = mariadb.createPool({
    host: 'maria',
    user: 'root',
    database: 'todo',
    password: '1q2w3e4r',
    connectionLimit: '10',
  });

  return pool;
};

const allSelect = async () => {
  let conn, rows;

  try {
    if (!pool) pool = await init();
    conn = await pool.getConnection();
    rows = await conn.query(
      `select * from todos where deleted != 'Y' order by checked, id`
    );
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }

  return rows;
};

const oneSelect = async (id) => {
  let conn, rows;

  try {
    if (!pool) pool = await init();
    conn = await pool.getConnection();
    rows = await conn.query(`select * from todos where id = ${id}`);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }

  return rows;
};

const insert = async (text, color) => {
  let conn, rows;

  try {
    if (!pool) pool = await init();
    conn = await pool.getConnection();
    rows = await conn.query(
      `insert into todos (text, color) values ('${text}', '${color}')`
    );
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }

  return rows;
};

const update = async (id, text, color, checked) => {
  let conn, rows;

  try {
    if (!pool) pool = await init();
    conn = await pool.getConnection();
    rows = await conn.query(
      `update todos set text='${text}', color='${color}', checked=${checked} where id = ${id}`
    );
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }

  return rows;
};

const remove = async (id) => {
  let conn, rows;

  try {
    if (!pool) pool = await init();
    conn = await pool.getConnection();
    rows = await conn.query(`update todos set deleted = 'Y' where id=${id}`);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }

  return rows;
};

export default { allSelect, oneSelect, insert, update, remove };
