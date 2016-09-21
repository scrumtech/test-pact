# -*- mode: ruby -*-
Vagrant.configure(2) do |config|

  config.vm.box = "bento/ubuntu-16.04"

  config.vm.synced_folder "./", "/vagrant"

  # default docker-compose.yml ports
  # config.vm.network "forwarded_port", guest: 5900, host: 5900, auto_correct: true
  # config.vm.network "forwarded_port", guest: 8080, host: 8080, auto_correct: true
  # config.vm.network "forwarded_port", guest: 8088, host: 8088, auto_correct: true
  # config.vm.network "forwarded_port", guest: 8443, host: 8443, auto_correct: true
  # config.vm.network "forwarded_port", guest: 9444, host: 9444, auto_correct: true
  # config.vm.network "forwarded_port", guest: 5432, host: 5432, auto_correct: true
  # config.vm.network "private_network", ip: "192.168.33.12"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
	  # v.gui = true
    # Allow symlinks
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate//vagrant", "1"]
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  # config.vm.provision :shell, :path => ".vagrant-config/provision.sh"
  # config.vm.provision :shell, :path => ".vagrant-config/setup-certs.sh"
  config.vm.provision :shell, privileged: false, :path => ".vagrant-config/node_install.sh"
end
