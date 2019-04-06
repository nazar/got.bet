const utils = require( 'shipit-utils' );


module.exports = function ( gruntOrShipit ) {
    var shipit = utils.getShipit( gruntOrShipit );

    require( 'shipit-deploy' )( shipit );
    require( './update' )( shipit );

    utils.registerTask( shipit, 'link:folders', function () {

        async function linkLogs() {
            await shipit.remote(
                'mkdir -p /var/www/gotbet/shared/logs'
            );

            await shipit.remote(
                'ln -s /var/www/gotbet/shared/logs ' + shipit.releasePath + '/api/logs'
            );
        }

        return linkLogs();

    } );

    utils.registerTask( shipit, 'yarn:install', async function () {
        await shipit.remote(
          `cd ${shipit.releasePath}/api && yarn --frozen-lockfile --production`
        );
    } );

    utils.registerTask( shipit, 'reload:gotbet', async function () {
        await shipit.remote('mkdir -p ' + shipit.releasePath + '/api/tmp');
        await shipit.remote('touch ' + shipit.releasePath + '/api/tmp/restart.txt')
    } );

    utils.registerTask( shipit, 'deploy-local', [
        'deploy:init',
        'deploy:update-local',
        'link:folders',
        'yarn:install',
        'deploy:publish',
        'deploy:clean',
        'reload:gotbet'
    ] );
};
