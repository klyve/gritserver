# challengeserver

&nbsp;

####Install server on macOS Sierra 10.12.1
*20.11.2016*

1. Install homebrew - paste following in terminal: 

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2\. Update brew
```bash
 brew update
```

3\. Install MongoDB
```bash
brew install mongodb
```

4\. Install node.js
```bash
brew install npm install
```

5\. Launch mongod
```bash
sudo mongod
```

6\. Navigate to directory were you want server to reside. Example:
```bash
cd ~/GitHub
```

7\. Clone server repo from git
```bash
git clone git@github.com:klyve/challengeserver.git
```
8\. Move into server
```bash
cd challangeserver
```

9\. Launch server using node.js
```bash
npm start
```
10\. Enjoy!

&nbsp;

####Tree structure

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