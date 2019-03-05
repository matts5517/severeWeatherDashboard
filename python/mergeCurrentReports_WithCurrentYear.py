# -------------------------------------------------------------------------------
# Name:        Severe Storm Report Extraction Script
# Purpose:
#
# Author:      Matt Silveira
#
# Created:     02/28/2017 ***** Updated 02/09/2019
# Copyright:   (c) Matt Silveira 2019
# Licence:     ''
# -------------------------------------------------------------------------------
import math, os, sys, time, datetime, xml.etree.ElementTree, json
from email.Utils import formatdate
import xml.etree.ElementTree as ET
from dateutil import parser
from xml.dom import minidom
import xml.sax
import urllib
import zipfile
import csv

print time.asctime()
start = time.time()
# Script starts here
# -------------------------------------------------------------------------------


print time.asctime()
start = time.time()
# Script starts here
# -------------------------------------------------------------------------------


date = datetime.datetime.today()
date = str(date)[:-16].split('-')
date = date[0][-2:] + date[1] + date[2]

# root path 
# rootPath = 'var/www/html/python/'
# rootPath = 'var/www/html/efs/'
rootPath = ''
# storm reports url
url = 'http://www.spc.noaa.gov/climo/reports/today_filtered.csv'
# other vars
currentYearFilePath = rootPath + 'data/csv/2019/severeData_'+ date + '.csv'
jsonYearPath = rootPath + 'data/geoJson/severeWeather/currentYear_stormReports.json'
yearDir  = rootPath + 'data/csv/2019'

urllib.urlretrieve(url, currentYearFilePath)

# loop through all csv's and rebuild json file #######################################################################
# loop through dir of csv files and merge into one geojson file
jsonData = []
uid = 1
for file in os.listdir(yearDir):
    if file[-4:] == '.csv':
        filePath = os.path.join(yearDir, file)
        date = file.split('_')[1][:-4]
        fmt = '%y%m%d'
        dt = datetime.datetime.strptime(date, fmt)
        dayOfYear = dt.strftime('%j')
        with open(filePath, "rb") as f:
            reader = csv.reader(f, delimiter="\t")
            for i, line in enumerate(reader):
                line = str(line)[2:-2]
                listLine = line.split(',')
                if 'F_Scale' in str(listLine):
                    reportType = 'tornado'
                if 'Speed' in str(listLine):
                    reportType = 'wind'
                if 'Size' in str(listLine):
                    reportType = 'hail'
                try:
                    if listLine[0] != "Time": # take out the headers for eac file
                        if reportType == 'hail':
                            eventType = 'hail'
                            eventNum = 1
                        if reportType == 'wind':
                            eventType = 'wind'
                            eventNum = 2
                        if reportType == 'tornado':
                            eventType = 'tornado'
                            eventNum = 3
                        timeReported = listLine[0]
                        size = listLine[1]
                        location = listLine[2]
                        county = listLine[3]
                        state = listLine[4]
                        lat = listLine[5]
                        lon = listLine[6]
                        comments = listLine[7]
                        date = date
                        uniqueid = str(uid) + '_' + str(timeReported) + '_' + str(date)

                        d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(lon), float(lat)]},
                        'properties': {'uniqueid': uniqueid,'dayOfYear':dayOfYear,'date':date,'timeReported': timeReported,'size': size, 'location':location,'county':county ,'state':state,'eventType':eventType,'eventNum':eventNum,'comments':comments , 'marker-symbol':'default_marker'}}
                        jsonData.append(d1)
                        uid +=1
                except:
                    print 'except', listLine, date
jsonData = {'type': 'FeatureCollection', 'features': jsonData}
with open(jsonYearPath, 'w') as outfile:
    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))
