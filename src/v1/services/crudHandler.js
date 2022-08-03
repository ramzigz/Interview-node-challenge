import fs from 'fs';
import path from 'path';

const rawdata = fs.readFileSync(path.resolve('src/DB/users.json'));
let users = JSON.parse(rawdata);

const crudHandler = {
  create({
    data,
  }) {
    try {
      const payload = {
        id: `A${+users[users.length - 1].id.split('A')[1] + 1}`,
        ...data,
      };
      users.push(payload);
      this.updateFile();
      return crudHandler.getById({
        id: payload.id,
      });
    } catch (err) {
      return { error: err };
    }
  },

  getList() {
    try {
      return users;
    } catch (err) {
      return { error: err };
    }
  },

  getById({
    id,
  }) {
    try {
      return users.find((item) => item.id === id);
    } catch (err) {
      return { error: err };
    }
  },
  getLastUserId() {
    try {
      return users[users.length].id;
    } catch (err) {
      return { error: err };
    }
  },

  getOneByEmail({
    email = null,
  }) {
    try {
      if (!email) {
        return { error: 'Invalid email' };
      }
      return users.find((item) => item.email === email);
    } catch (err) {
      return { error: err };
    }
  },

  update({
    id,
    data = {},
  }) {
    try {
      users = users.map((item) => {
        if (item.id === id) {
          return { ...data };
        }

        return item;
      });
      this.updateFile();
      return crudHandler.getById({
        id,
      });
    } catch (err) {
      console.log("🚀 ~ file: crudHandler.js ~ line 82 ~ err", err)
      return { error: err };
    }
  },

  delete({ id }) {
    try {
      const index = users.findIndex((item) => item.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        this.updateFile();
        return true;
      }
      return false;
    } catch (err) {
      return { error: err };
    }
  },
  updateFile() {
    try {
      const fileData = JSON.stringify(users);
      return fs.writeFile(path.resolve('src/DB/users.json'), fileData, (err) => {
        if (err) { console.log(err); } else {
          console.log('File written successfully\n');
        }
      });
    } catch (err) {
      return { error: err };
    }
  },
};
export default crudHandler;
