#!/usr/bin/env bash
sudo apt-get update
sudo apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo rm /usr/bin/node # Remove the other 'node' symlink (Something about packet radio)
sudo ln -s `which nodejs` /usr/bin/node
sudo npm install npm -g
sudo npm config set registry https://registry.npmjs.com/
sudo npm config set strict-ssl false
