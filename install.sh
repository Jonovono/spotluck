exists()
{
  node -v "$1" >/dev/null 2>&1
}

if exists node; then
  echo "Node exists"
else
  if exists brew; then
    echo "Brew Exists"
  else
    echo "Installing Brew"
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" >/dev/null
  fi

  echo "Installing Node"
  brew install node >/dev/null
fi

echo "Installing Spotluck"
npm install spotluck -g >/dev/null
