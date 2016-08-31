#!/bin/bash
echo updating package information
sudo apt-add-repository -y ppa:brightbox/ruby-ng >/dev/null 2>&1

echo copying set_env_vars.sh file to etc/profile.d
sudo cp /vagrant/.vagrant-config/set_env_vars.sh /etc/profile.d/set_env_vars.sh

sudo apt-get --yes update

# install depedencies
sudo apt-get -y install autoconf bison build-essential git libssl-dev libyaml-dev libreadline6 libreadline6-dev zlib1g zlib1g-dev libcurl4-openssl-dev curl wget unzip dos2unix libpq-dev python --force-yes

# install newer version of ruby
sudo apt-get -y install ruby2.2 ruby2.2-dev --force-yes
# following two lines might not be required (leaving in case we need them)
#sudo update-alternatives --set ruby /usr/bin/ruby2.2>/dev/null 2>&1
#sudo update-alternatives --set gem /usr/bin/gem2.2 >/dev/null 2>&1

sudo gem install bundler

# install aws tools
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

echo "cd /vagrant" >> /home/ubuntu/.profile
