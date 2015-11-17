# README #

#### You need Typescript (TSC) to use this repo.
To install:
> npm install -g typescript
Version >=1.6 is recommended

#### You need TSD in addition to the Typescript compiler (TSC) to use this repo.
To install:
> npm install -g tsd

Ensure you have v 0.6.5 or later, as tsd install will NOT reference the tsd.json file to manage definitions. 

##### A note if you are using Visual Studio Code
This code base does not use reference paths in it's *.ts files.  This is an all or nothing code model, so do NOT add reference paths to your files or you will lose VSC's automatic definition mapping across the entire project code base.


### To run the project locally
Clone repo. Run npm install && bower install && tsd install && gulp dev

### What is this repository for? ###

* Basic Typescript, Gulp and Angular setup

### What is required ###
* npm
* bower
* typescript compiler
* tsd definition manager