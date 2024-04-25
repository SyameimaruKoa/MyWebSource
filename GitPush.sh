#!/bin/bash
cd "/var/www/"
d=`date "+%F"` #全体をバッククォートで囲む
echo $d
git add .
git commit -m "$dに自動Push"
git -c core.sshCommand="ssh -i /root/.ssh/github" push origin main
