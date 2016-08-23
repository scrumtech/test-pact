#!/usr/bin/env bash
# add nib proxy certificate to trusted ca certs
sudo mkdir /usr/share/ca-certificates/extra
sudo /bin/sh -c "cat /vagrant/.vagrant-config/nib-root.pem >> /usr/share/ca-certificates/extra/nib-root.crt"
sudo /bin/sh -c "echo 'extra/nib-root.crt' >> /etc/ca-certificates.conf"
sudo update-ca-certificates
