@echo off

 set dbUser=root
 set dbPassword=""
 set backupDir="C:\xampp\htdocs\Billet_Casting\Lib"
 set mysqldump="C:\xampp\mysql\bin\mysqldump.exe"
 set mysqlDataDir="C:\xampp\mysql\data"

for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
     set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
     set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"

     set "datestamp=%YYYY%%MM%%DD%" & set "timestamp=%HH%%Min%%Sec%"
     set "fullstamp=%YYYY%%MM%%DD%_%HH%%Min%"
 pushd %mysqlDataDir%
 %mysqldump% --host="localhost" --user=%dbUser% --password=%dbPassword% --single-transaction --add-drop-table --all-databases > %backupDir%\"database.sql"