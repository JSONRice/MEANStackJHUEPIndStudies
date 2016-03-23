#!/bin/bash
echo "Installing latest node and npm."
rm -rf /usr/local/lib/node_modules
brew uninstall node
brew install node --without-npm
echo prefix=~/.node >> ~/.npmrc
curl -L https://www.npmjs.com/install.sh | sh
echo "export PATH=\"$HOME/.node/bin:$PATH\"" >> ~/.bash_profile
echo "All done and ready to install global npm modules from npmjs. Just restart your terminal by typing 'bash'" 
