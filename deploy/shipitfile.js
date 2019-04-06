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
        host: '192.168.178.58',
        user: 'gotbet'
      }],
      key: './keys/production'
    }
  });
};
