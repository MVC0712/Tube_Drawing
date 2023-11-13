#!C:\python\python3.9\python.exe
# -*- coding: utf-8 -*-
import cgitb
import cgi
import os
import json
import sys
import io
import urllib.parse
import openpyxl

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

cgitb.enable()

data = sys.stdin.read()
params = json.loads(data)

print('Content-type: text/html\nAccess-Control-Allow-Origin: *\n')
print("\n\n")
print(json.JSONEncoder().encode('OK'))
print('\n')

wb = openpyxl.load_workbook('excel_file.xlsx')
sheet = wb.get_sheet_by_name('input')

sheet['c1'] = params["material_type"]
sheet['c2'] = params["dimention"]
sheet['c3'] = params["code"]
sheet['c4'] = params["product_date"]
sheet['c5'] = params["extrusion_scrap"]
sheet['c6'] = params["casting_scrap"]
sheet['c7'] = params["aluminium_ingot"]
sheet['c8'] = params["aluminium_orther"]
sheet['c9'] = urllib.parse.unquote(params["si"])
sheet['c10'] = urllib.parse.unquote(params["mg"])
sheet['c11'] = urllib.parse.unquote(params["mn"])
sheet['c12'] = urllib.parse.unquote(params["cr"])
sheet['c13'] = urllib.parse.unquote(params["cu"])
sheet['c14'] = urllib.parse.unquote(params["fe"])
sheet['c15'] = urllib.parse.unquote(params["zn"])
sheet['c16'] = urllib.parse.unquote(params["ti_b"])

wb.save("../../FileDownLoad/ExcelFile/" +
        params["product_date"] + "_" +
        params["code"] + "_" +
        params["material_type"] + ".xlsx")
