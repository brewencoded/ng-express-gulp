# ng-express-gulp
Base structure for an angular, gulp, and express project with browser-sync and gulp-nodemon for live previews. Also contains karma and jasmine test for server and client testing.

**Warning**: This is currently under **heavy** active development and will be very unstable until the app structure is stabilized. 

### Install

You **must** have node installed first. Download [Here](https://nodejs.org/) or use [nvm](https://github.com/creationix/nvm)

Install bower with npm

```
npm install -g bower
```

Install gulp
```
npm install -g gulp
```

Clone this repository and navigate into it 
``` 
git clone https://github.com/vrodriguez363/ng-express-gulp.git && cd ng-express-gulp
```

Now install with ` npm install && bower install`

### Usage

Navigate to the base directory in your terminal ` cd path/to/folder `, then run ` gulp `. This should open a new browser tab.

To run karma and jasmine tests, make sure you have navigated in your terminal to the cloned directory and run ` gulp test `

The structure is set and files are being watched. When you change a file and save, the browser should reload with the updated changes.

### Coming Soon

* semantic versioning

* commandline scaffolding

* passport for social media logins.

* refresh tokens