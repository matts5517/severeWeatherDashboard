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




url = 'http://www.spc.noaa.gov/climo/reports/today_filtered.csv'
currentYearFilePath = 'data/geoJson/severeWeather/today_reports/today_reports.csv'
jsonYearPath = 'data/geoJson/severeWeather/pastYear/currentYear.json'
jsonTodayPath = 'data/geoJson/severeWeather/today_reports/today_reports.json'
urllib.urlretrieve(url, currentYearFilePath)
jsonDataTodayToday = []


# for testing for use csv with data in it
currentYearFilePath = '/Users/Matts_Home/Documents/Box Sync/WeatherApp_WebsiteBackup/severeWeatherDashboard/python/data/csv/2019/severeData_190108.csv'
with open(currentYearFilePath, "rb") as f:
    reader = csv.reader(f, delimiter="\t")
    date = datetime.datetime.today()
    date = str(date)[:-16].split('-')
    date = date[0][-2:] + date[1] + date[2]
    fmt = '%y%m%d'
    dt = datetime.datetime.strptime(date, fmt)
    dayOfYear = dt.strftime('%j')

    uid = 1
    for i, line in enumerate(reader):
        # print line, uid
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
                jsonDataToday.append(d1)
                uid += 1
        except:
            print 'except'
        
jsonDataToday = {'type': 'FeatureCollection', 'features': jsonDataToday}
with open(jsonTodayPath, 'w') as outfile:
    json.dump(jsonDataToday, outfile, indent=4, separators=(',', ':'))


# merge the above jsonDataToday with the current year jsonDataToday
# print jsonDataToday
print jsonYearPath
# read jsonYearPath

# loop through json data from today

# merge with json year







# donwload all raw csv's to a folder
# i = 1
# while i < 60:
#     # get the correct date
#     day= str(datetime.datetime(2019, 1, 1) + datetime.timedelta(i - 1))
#     day = day.split(' ')[0]
#     day = str(day).split('-')
#     year = day[0][-2:]
#     month = day[1]
#     day= day[2]

#     newYearString = str(year + month + day)
#     print newYearString
#     filePath = 'data/csv/2019/severeData_' + newYearString + '.csv'
#     print filePath
#     url = 'http://www.spc.noaa.gov/climo/reports/' + newYearString + '_rpts_filtered.csv'

#     urllib.urlretrieve(url, filePath)
#     i+=1 # add i


# # loop through dir of csv files and merge into one geojson file
# yearDir  = '/Users/Matts_Home/Documents/Box Sync/WeatherApp_WebsiteBackup/severeWeatherDashboard/python/data/csv/2019'
# jsonDataToday = []
# uid = 1
# for file in os.listdir(yearDir):
#     if file[-4:] == '.csv':
#         filePath = os.path.join(yearDir, file)
#         date = file.split('_')[1][:-4]
#         fmt = '%y%m%d'
#         dt = datetime.datetime.strptime(date, fmt)
#         dayOfYear = dt.strftime('%j')
#         with open(filePath, "rb") as f:
#             reader = csv.reader(f, delimiter="\t")
            
#             for i, line in enumerate(reader):
#                 print uid, 'uid'
#                 
# jsonDataToday = {'type': 'FeatureCollection', 'features': jsonDataToday}

# # print jsonPath
# with open(jsonPath, 'w') as outfile:
#     json.dump(jsonDataToday, outfile, indent=4, separators=(',', ':'))



# build a dir for every days csv files, or read the one merged geojson file

# on run every 15 mins, grab the most current storm reports and make a file called current

# keep overwriting that current file 

# merge current with the current_year file



