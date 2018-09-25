#!/bin/bash
tarName="KH.tar.gz"
if [[ -f $tarName ]];then
  rm -rf $tarName 
fi
git pull
gulp pack
tar -czf  $tarName ./KH
git add .
git commit -m `"提交"${date}`
git push
