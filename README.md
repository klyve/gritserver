# challengeserver

&nbsp;

#### Install local server on macOS Sierra 10.12.1
*Last updated: 06.12.2016*

```bash
                                    // Get brew, just...
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update
brew install mongodb                // Mongo database
brew install node                   // JS package-manager

npm install -g nodemon              // Nodemon - live server reloading
sudo mkdir -p /data/db              // Make system MongoDb data-file

cd ~/GitHub                         // Clone repo from github
git clone
git@github.com:klyve/challengeserver.git
cd challangeserver

npm install                         // Install dependencies
sudo mongod                         // Launch DB
nodemon app.js                      // Launch server

// DONE!
```

&nbsp;

####Project tree structure

>- api
    + group.js
    + user.js
- models
    + Challange.js
    + Group.js
    + Notification.js
    + User.js
- modules
    + database.js
    + models.js
- app.js
- package.json
- README.md
- seeding.js
- yarn.lock
