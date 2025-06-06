'use strict';

//import { faker } from "@faker-js/faker";
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const seed_count = 200;
    for (let i = 0; i < seed_count; i++) {
      const firstName = faker.person.firstName().replace('\'', '');
      const lastName = faker.person.lastName().replace('\'', '');
      const email = faker.internet.email({ firstName: firstName, lastName: lastName });
      const password = await bcrypt.hash(faker.internet.password(),10);
      const role = i % 10 > 0 ? 'student' : 'teacher';
      const status = (() => {
        if (i % 40 == 0) {
          return 'fired';
        }
        else if (i < 20 && role != 'teacher') {
          return 'graduated';
        }
        else if(i%8 == 0){
          return 'banned';
        }
        else {
          return 'active';
        }
      })()
      
      const sql = `INSERT INTO users
      (firstName, lastName, email, password, role, status)
      VALUES
      ('${firstName}', 
      '${lastName}', 
      '${email}', 
      '${password}', 
      '${role}',
      '${status}'
      );
      `
      await queryInterface.sequelize.query(sql);
    }
    
    ['admin', 'student', 'teacher'].forEach(async role => {
      const pass = await bcrypt.hash(role, 10);
      await queryInterface.sequelize.query(`INSERT INTO users
      (firstName, lastName, email, password, role, status)
      VALUES
      ('ivan', 
      '${role}', 
      '${role}@mail.com', 
      '${pass}', 
      '${role}',
      'active'
      );
      `);
    })
    await queryInterface.sequelize.query(`INSERT INTO users
    (firstName, lastName, email, password, role, status)
    VALUES
    ('Ivan', 
    'Kozlovsky', 
    'ivan.kz5565@gmail.com', 
    '${adminPass}', 
    'admin',
    'active'
    );
    `);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.query(`DELETE FROM users`);
    await queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1;');
  }
};
