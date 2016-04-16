1. Install GIT
2. Install Ruby [Windows]
// Add ^ to PATH [Windows]
3. Install NodeJS (NPM is integrated)
4. Install Sass (gem install sass)
5. Install MongoDB
// Add ^ to PATH [Windows]
6. Install Bower [npm install -g bower]
7. Install gulp [npm install -g gulp-cli]
8. Clone Repo
9. Navigate to Repo Directory
10. Add SSH key to Thom's Github to access Triangular Repo
// Use Git Bash if on windows
// https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
11. Test SSH connection
// https://help.github.com/articles/testing-your-ssh-connection/
12. On success of ^, Run 'npm install'
// It will trigger a bower update, but if it doesnt, run 'bower install'
13. Make sure you have a db/data in your root directory (Default MongoDB path)
14. Turn On Mongo , run 'mongod' in terminal/cmd
15. Run node app.js in repo directory
16. Sign up
15. Open Mongo Shell, via 'mongo' in terminal/cmd
16. enter 'use dashboard'
17. enter
  db.users.update(
  {username: 'your username'},
  )
18. Signout and Sign back in to get clients
