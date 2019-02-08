#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      msilveira
#
# Created:     28/02/2017
# Copyright:   (c) msilveira 2017
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import math, os, sys, time, datetime, xml.etree.ElementTree, json
from email.Utils import formatdate
print  time.asctime()
start = time.time()
#Script starts here
#-------------------------------------------------------------------------------


from xml.dom import minidom
import xml.sax
import urllib
import zipfile
import csv

reportDate = '130520' # May 20th 2013
filePath = 'data/csv/fileSevere.csv'
jsonPath = 'data/geoJson/severeData_' + reportDate + '.json'



url = 'http://www.spc.noaa.gov/climo/reports/' + reportDate + '_rpts_raw.csv'
urllib.urlretrieve(url, filePath)

jsonData = []
with open(filePath, "rb") as f:
    reader = csv.reader(f, delimiter="\t")
    for i, line in enumerate(reader):
        line = str(line)[2:-2]
        listLine = line.split(',')
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
            if reportType == 'wind':
                eventType = 'wind'
            if reportType == 'tornado':
                eventType = 'tornado'

            timeReported = listLine[0]
            size = listLine[1]
            location = listLine[2]
            county = listLine[3]
            state = listLine[4]
            lat = listLine[5]
            lon = listLine[6]
            comments = listLine[7]

            d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(lon), float(lat)]},
            'properties': {'timeReported': timeReported,'size': size, 'location':location,'county':county ,'state':state,'eventType':eventType,'comments':comments , 'marker-symbol':'default_marker'}}
            jsonData.append(d1)

        except:
            print 'no index for this var'

jsonData = {'type': 'FeatureCollection', 'features': jsonData}
print jsonData
with open(jsonPath, 'w') as outfile:
    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))






