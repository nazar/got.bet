module.exports = function ( shipit ) {
  require('./deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: './build',
      deployTo: '/var/www/gotbet/',
      rsync: ['--del'],
      keepReleases: 3,
      deleteOnRollback: false
    },

    production: {
      servers: [{
        host: 'got.bet',
        user: 'gotbet'
      }],
      key: './keys/production'
    }
  });
};
