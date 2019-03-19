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
from datetime import datetime as datetime2
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

jsonPath = 'data/geoJson/severeWeather/pastYear/currentYear.json'

# get UTC date
date =  datetime2.utcnow()
date = str(date)[:-16].split('-')
date = date[0][-2:] + date[1] + date[2]
fmt = '%y%m%d'
dt = datetime2.strptime(date, fmt)
dayOfYearToday = dt.strftime('%j')

# download all raw csv's to a folder
i = 1
while i < int(int(dayOfYearToday) + 1):
    # get the correct date
    day= str(datetime.datetime(2019, 1, 1) + datetime.timedelta(i - 1))
    day = day.split(' ')[0]
    day = str(day).split('-')
    year = day[0][-2:]
    month = day[1]
    day= day[2]

    newYearString = str(year + month + day)
    print newYearString
    filePath = 'data/csv/2019/severeData_' + newYearString + '.csv'
    print filePath
    url = 'http://www.spc.noaa.gov/climo/reports/' + newYearString + '_rpts_filtered.csv'

    urllib.urlretrieve(url, filePath)
    i+=1 # add i
