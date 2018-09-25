#!/bin/bash
tarName="KH.tar.gz"
if [[ -f $tarName ]];then
  rm -rf $tarName 
fi
gulp pack
tar -czf  $tarName ./KH
