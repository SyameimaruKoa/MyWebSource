#!/bin/bash
cd /var/www
git fetch origin
git reset --hard origin/main
git -c core.sshCommand="ssh -i /root/.ssh/github" pull origin main
