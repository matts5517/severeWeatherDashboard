# -------------------------------------------------------------------------------
# Name:        Local Storm Report Extraction Script
# Purpose:
#
# Author:      Matt Silveira
#
# Created:     10/20/2019
# Copyright:   (c) Matt Silveira 2019
# Licence:     ''
# -------------------------------------------------------------------------------
import math, os, sys, time, datetime, xml.etree.ElementTree, json
from datetime import datetime
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


# get UTC date
date =  datetime.utcnow()
date = str(date)[:-16].split('-')
date = date[0][-2:] + date[1] + date[2]
fmt = '%y%m%d'
dt = datetime.strptime(date, fmt)
dayOfYearToday = dt.strftime('%j')

# root path 
# rootPath = '/var/www/html/efs/'
rootPath = '/Users/Matts_Home/Documents/Box Sync/WeatherApp_WebsiteBackup/severeWeatherDashboard/efs/'

# storm reports url
url = 'https://mesonet.agron.iastate.edu/cgi-bin/request/gis/lsr.py?wfo[]=ALL&recent=86400&justcsv=1'
# other vars
local_storm_report_path = rootPath + 'severeWeatherData/csv/local_storm_report_24.csv'
jsonYearPath = rootPath + 'severeWeatherData/geoJson/local_storm_report_24.json'
urllib.urlretrieve(url, local_storm_report_path)
jsonData = []

eventNum = {
    'SNOW': 1,
    'HEAVY SNOW': 2,
    'BLIZZARD': 3,
    'FREEZING RAIN': 4,
    'SLEET': 5,
    'AVALANCHE':6,
    'EXTR WIND CHILL':7,
    'EXTREME COLD':8,
    'NON-TSTM WND GST':9,


}

# read through csv and convert to geoJSON
with open(local_storm_report_path, "rb") as f:
    reader = csv.reader(f, delimiter="\t")
    for i, line in enumerate(reader):
        if i != 0: # skip the header line
            # print i, line
            line = line[0].split(',')
            date = line[0]
            lat = line[2]
            lon = line[3]
            magnitude = line[4]
            value = line[7]
            location = line[8]
            source = line[11]
            comment = line[12]
            for item in eventNum:
                # print value, item
                if value == item:
                    print value, item, '################'
                    event_id = eventNum[item]
                    print event_id, '%%%%%%%%%%%%%%%%%%'
                    break
                else:
                    event_id = 0

          
            print date, lat,lon, magnitude, value, location, source, comment, event_id

            d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(lon), float(lat)]},
                'properties': {'event_id':event_id, 'date':date,'magnitude': magnitude, 'location':location,'eventType':value,'source':source,'comments':comment , 'marker-symbol':'default_marker'}}
            jsonData.append(d1)

jsonData = {'type': 'FeatureCollection', 'features': jsonData}
with open(jsonYearPath, 'w') as outfile:
    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))
