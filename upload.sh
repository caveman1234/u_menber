#!/bin/bash
tarName="KH.tar.gz"
commitMark=`date +"%H时%M分%S秒星期%A"`
if [[ -f $tarName ]];then
  rm -rf $tarName 
fi
git pull
gulp pack
tar -czf  $tarName ./KH
git add .
git commit -m ${commitMark}
git push
