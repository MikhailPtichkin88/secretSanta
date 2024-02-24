cd ~/secretSanta
npm run build:prod

rm -rf ~/../var/www/secretSanta/html
mv ~/secretSanta/build ~/../var/www/secretSanta/html