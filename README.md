Pickomino
======================

A Symfony project created on June 21, 2016.

This project is an implementation of Pickomino dice game using Symfony and Angular

##	Steps to install:

```bash
# Create parameters.yml file and setup database parameters
composer install # this will install node as well
npm install # this will install bower
bower install

# For almost all OS other than Windows
php app/console assets:install --symlink web
# For Windows, use
php app/console assets:install web

php app/console doctrine:database:create
php app/console doctrine:schema:update --force
```
