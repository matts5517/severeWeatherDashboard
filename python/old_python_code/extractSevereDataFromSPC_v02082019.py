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


reportDate = '130520'  # May 20th 2013 for testing, lots of storms this day

d = datetime.date.today()
month = '%02d' % d.month
day = '%02d' % d.day
year = str(str('%02d' % d.year)[-2:])

now = datetime.datetime.now()
todaysDate = str(str(year) + str(month) + str(day))


filePath = 'data/csv/fileSevere_' + reportDate + '.csv'
jsonPath = 'data/geoJson/severeData_' + reportDate + '.json'


url = 'http://www.spc.noaa.gov/climo/reports/' + reportDate + '_rpts_raw.csv'
urlToday = 'http://www.spc.noaa.gov/climo/reports/today_raw.csv'

urllib.urlretrieve(url, filePath)

jsonData = [] 
with open(filePath, "rb") as f:
    reader = csv.reader(f, delimiter="\t")
    for i, line in enumerate(reader):
        line = str(line)[2:-2]
        listLine = line.split(',')
        print listLine
        time = listLine[0]
        if 'Raw Tornado LSR' in str(listLine):
            reportType = 'tornado'
        if 'Raw Wind/Gust LSR' in str(listLine):
            reportType = 'wind'
        if 'Raw Hail LSR' in str(listLine):
            reportType = 'hail'

        try:
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

            d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(lon), float(lat)]},
            'properties': {'timeReported': timeReported,'size': size, 'location':location,'county':county ,'state':state,'eventType':eventType,'eventNum':eventNum,'comments':comments , 'marker-symbol':'default_marker'}}
            jsonData.append(d1)

        except:
            print 'no index for this var'

jsonData = {'type': 'FeatureCollection', 'features': jsonData}
# print jsonData
print jsonPath
with open(jsonPath, 'w') as outfile:
    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))
