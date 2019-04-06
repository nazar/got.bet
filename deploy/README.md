# Instructions

Reminder to self how to build the server and deploy

## Provisioning

See [provision](./provision.sh) for server installation script.

## Deploying

### Private key

Steps to generate a private key to place in [./keys/production](./keys/production) for auto SSH login.

1. `ssh-keygen`
2. `cat /home/nazar/.ssh/id_rsa` to get the private key. Copy it into [./keys/production](./keys/production).
3. `chmod 400 ./keys/production`
4. `cat /home/nazar/.ssh/id_rsa.pub` and copy the string to the remote server to `/home/gotbet/.ssh/authorized_keys`
4. Create the `/var/www/gotbet` folder on the server. Chown it to a non-privileged user


To deploy: `yarn shipit production deploy-local`
