const Bluebird = require('bluebird');


module.exports = function setStatus(knex, statusUpdates) {
  return Bluebird.each(statusUpdates, ({ name, status }) =>{
    return knex('victims')
      .update({ status })
      .where({ name });
  })
};
