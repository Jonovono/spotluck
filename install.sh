exists()
{
  node -v "$1" >/dev/null 2>&1
}

if exists node; then
  echo "Node exists"
else
  # curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

  echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
  . ~/.bashrc
  mkdir ~/local
  mkdir ~/node-latest-install
  cd ~/node-latest-install
  curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1 >/dev/null
  ./configure --prefix=~/local >/dev/null
  make install >/dev/null
  curl https://www.npmjs.org/install.sh | sh >/dev/null
fi