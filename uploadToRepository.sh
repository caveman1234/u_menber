#!/bin/bash
# 下载地址:https://github.com/caveman1234/u_menber/blob/master/KH.tar.gz?raw=true
tarName="KH.tar.gz"
commitMark=`date +"%H时%M分%S秒%A"`
if [[ -f $tarName ]];then
  rm -rf $tarName 
fi

git pull
gulp pack
tar -czf  $tarName ./KH
git add .
git commit -m ${commitMark}
git push
