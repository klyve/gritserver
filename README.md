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
brew install node
```

5\. Install node.js package that makes live reloading of npm server possible
```bash
npm install -g nodemon
```

6\. Make system MongoDb data-file
```bash
sudo mkdir -p /data/db
```

7\. Navigate to directory were you want server to reside, for instance:
```bash
cd ~/GitHub
```

8\. Clone server repo from git
```bash
git clone git@github.com:klyve/challengeserver.git
```

9\. Move into server
```bash
cd challangeserver
```

10\. Install local node.js packages
```bash
npm install
```

11\. Launch mongod from a separate terminal window and let it run
```bash
sudo mongod
```

12\. Launch server using nodemon in project folder
```bash
nodemon app.js
```

13\. Enjoy!

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
