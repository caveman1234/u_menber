#!/bin/bash
tarName="KH.tar.gz"
commitMark=date
if [[ -f $tarName ]];then
  rm -rf $tarName 
fi
git pull
gulp pack
tar -czf  $tarName ./KH
git add .
git commit -m ${commitMark}
# git push
