#!/bin/bash
cd "/var/www/"
echo $d
git -c core.sshCommand="ssh -i /root/.ssh/github" pull origin main
