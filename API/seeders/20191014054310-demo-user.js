'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'johni@gmail.com',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Johni Kecil',
          username: 'johni',
        },
        {
          email: 'ardi@gmail.com',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Ardi W Saputra',
          username: 'ardiwsaputra',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
