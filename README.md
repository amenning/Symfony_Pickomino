Pickomino 
======================

A Symfony project created on June 21, 2016.

This project is a implementation of Pickomino dice game using Symfony and Angular

##	Steps to install:

```bash
# Create parameters.yml file and setup database parameters
composer install
bower install
php app/console assets:install web
php app/console doctrine:database:create
php app/console doctrine:schema:update --force
```
