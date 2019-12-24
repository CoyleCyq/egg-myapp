'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: true,
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
};
