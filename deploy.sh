pwd=`pwd`
tarName="KH.tar.zip"
rm -rf $tarName
tar -zcvf $tarName KH
scp -P 22 $tarName root@111.231.219.176:/root/dr9527
rm -rf $tarName
