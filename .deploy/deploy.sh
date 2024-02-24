cd ~/secretSanta
npm run build:prod

rm -rf ~/../var/www/UlbiTV_frontend/secret_santa
mv ~/secretSanta/build ~/../var/www/UlbiTV_frontend/secret_santa