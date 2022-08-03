/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import crudHandler from './crudHandler.js';

const userServices = {
  create({ data }) {
    try {
      const {
        age,
        ...user
      } = data;

      const userData = {
        birthday: moment().subtract(+age, 'years').format('YYYY-MM-DD'),
        ...user,
      };

      const newUser = crudHandler.create({
        data: userData,
      });
      return this.getById({
        id: newUser.id,
      });
    } catch (error) {
      return (error);
    }
  },
  update({ id, data }) {
    try {
      const {
        age,
        ...user
      } = data;

      const userData = {
        birthday: moment().subtract(+age, 'years').format('YYYY-MM-DD'),
        ...user,
      };

      crudHandler.update({
        id, data: userData,
      });
      return this.getById({ id });
    } catch (error) {
      return (error);
    }
  },

  getList() {
    try {
      const users = crudHandler.getList();
      const usersList = users.map((item) => ({
        id: item.id,
        email: item.email,
        full_name: `${item.first_name} ${item.last_name}`,
        age: moment().diff(item.birthday, 'years'),
      }));
      return { list: usersList, counts: users.length };
    } catch (error) {
      return (error);
    }
  },

  getById({ id }) {
    try {
      const user = crudHandler.getById({ id });
      return user ? {
        id: user.id,
        email: user.email,
        full_name: `${user.first_name} ${user.last_name}`,
        age: moment().diff(user.birthday, 'years'),
      } : null;
    } catch (error) {
      return (error);
    }
  },

  getOneByEmail({ email }) {
    try {
      return crudHandler.getOneByEmail({
        email,
      });
    } catch (error) {
      return error;
    }
  },
  getLastUserId() {
    try {
      return crudHandler.getLastUserId();
    } catch (error) {
      return error;
    }
  },

  deleteOne(id) {
    try {
      return crudHandler.delete({ id });
    } catch (error) {
      return error;
    }
  },

};

export default userServices;
