apt-get update -y

# install esentials

apt-get install -y rsync curl


# install passenger

apt-get install -y dirmngr gnupg
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
apt-get install -y apt-transport-https ca-certificates
sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger stretch main > /etc/apt/sources.list.d/passenger.list'
apt-get update
apt-get install -y nginx-extras passenger

if [ ! -f /etc/nginx/modules-enabled/50-mod-http-passenger.conf ]; then ln -s /usr/share/nginx/modules-available/mod-http-passenger.load /etc/nginx/modules-enabled/50-mod-http-passenger.conf ; fi
ls /etc/nginx/conf.d/mod-http-passenger.conf


# install Node 10 LTS

curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# install yarn

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update
apt install -y yarn

# postgres 11
echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt-get update
apt-get install -y postgresql-11

# redis
apt install -y redis-server

# create the gotbet user
adduser --disabled-password --gecos "" gotbet

# now the gotbet user and database
runuser -l postgres -c 'createuser gotbet'
runuser -l postgres -c 'createdb -O gotbet gotbet'
echo "alter user gotbet with encrypted password 'ichangedthepasswordordidi';" | runuser -l postgres -c 'psql'
