apt-get update -y

# install passenger

apt-get install -y dirmngr gnupg curl gcc g++ make
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
apt-get install -y apt-transport-https ca-certificates
sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger stretch main > /etc/apt/sources.list.d/passenger.list'
apt-get update
apt-get install -y libnginx-mod-http-passenger


# install Node 10 LTS

curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash -
source /root/.bashrc
nvm install v10.15.3
nvm alias default 10.15.3

# postgres 11
echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt-get update
apt-get install -y postgresql-11

# redis
apt install -y redis-server
