# -------------------------------------------------------------------------------
# Name:        River Flow Data Extraction Script
# Purpose:
#
# Author:      Matt Silveira
#
# Created:     03/28/2019
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
# declare variables
filePath = 'data/geoJson/riverFlowData.json'
riverFlowGeoJson = 'data/geoJson/riverFlowGeoJsonData.json'
url = r'https://data.colorado.gov/resource/a97x-8zfv.json'
geoJsonData = []
urllib.urlretrieve(url, filePath)
with open(filePath) as json_file:  
    data = json.load(json_file)
    for item in data:
        try:
            dwr_abbrev = item['dwr_abbrev']
        except:
            dwr_abbrev = 'null'
        try:
            usgs_station_id = item['usgs_station_id']
        except:
            usgs_station_id = 'null'
        try:
            date_time = item['date_time']
        except:
            date_time = 'null'
        try:

            data_source = item['data_source']
        except:
            data_source = 'null'
        try:
            station_status = item['station_status']
        except:
            station_status = 'null'

        try:
            station_type = item['station_type']
        except:
            station_type = 'null'

        try:
            amount = item['amount']
        except:
            amount = 'null'

        try:
            units = item['units']
        except:
            units = 'null'

        try:
            http_linkage = item['http_linkage']
        except:
            http_linkage = 'null'

        try:
            station_name = item['station_name']
        except:
            station_name = 'null'
       
        try:
            location = item['location']
        except:
            location = 'null'


        if location == 'null':
            'do not locate'
        else:
            lon = float(location['coordinates'][0])
            lat = float(location['coordinates'][1])

            dataObject = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [int(lon), int(lat)]},
                            'properties': {'flow': amount, 'station_name': station_name, 'units':units,'station_type':station_type,'station_status':station_status,
                            'date_time':date_time, 'http_linkage':http_linkage,'data_source':data_source,'usgs_station_id':usgs_station_id,'dwr_abbrev':dwr_abbrev, 'marker-symbol':'default_marker'}}
            
            geoJsonData.append(dataObject)
geoJsonData = {'type': 'FeatureCollection', 'features': geoJsonData}
with open(riverFlowGeoJson, 'w') as outfile:
    json.dump(geoJsonData, outfile, indent=4, separators=(',', ':'))

    # reader = csv.reader(f, delimiter="\t")

    # for i, line in enumerate(reader):
    #     # print line
    #     lat = ''
    #     lon =''
    #     county = str(line).split(',')[2]
    #     stationName = str(line).split(',')[3]
    #     source = str(line).split(',')[4]
    #     usgsID = str(line).split(',')[6]
    #     stationStatus = str(line).split(',')[7]
    #     stationType = str(line).split(',')[8]
    #     date_time = str(line).split(',')[9]
    #     amount = str(line).split(',')[12]
    #     units = str(line).split(',')[13]
    #     moreInfoURL = str(line).split(',')[15]
    #     try:
    #         lat = str(str(line).split(',')[16])[2:]
    #         lon = str(str(line).split(',')[17])[:-2]
            
    #     except:
    #         'could not convert line to float'
    #     # print amount, stationName, lat,lon
    #     print lon, lat, stationName

        # dataObject = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [lon,lat]},
        #                 'properties': {'flow': amount, 'stationName': stationName, 'stationStatus': stationStatus, 'stationType':stationType,
        #                 'units':units, 'moreInfoURL': moreInfoURL, 'county': county, 'source':source,
        #                 'date':date_time,  'usgsID':usgsID, 'marker-symbol':'default_marker'}}
        # print dataObject
        



# # with open(filePath, "rb") as f:

# with open(filePath) as json_file:  
#     data = json.load(json_file)
#     for site in data['sites']:
#         flow = site['flow']
#         print flow
#         stationName = site['station_nm']
#         percentile = float(str(site['percentile']))
#         try:
#             percent_mean = float(str(site['percent_mean']))
#         except:
#             percent_mean = float(0.0)
#         try:
#             percent_median = float(str(site['percent_median']))
#         except:
#             percent_median = float(0.0)

#         date = site['flow_dt']
#         timezone = site['tz_cd']
#         site_no = site['site_no']
#         lat = site['dec_lat_va']
#         lon = site['dec_long_va']

#         dataObject = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(lon), float(lat)]},
#                         'properties': {'flow': flow, 'stationName': stationName, 'percentile':percentile,
#                         'percent_mean': percent_mean, 'percent_median': percent_median, 
#                         'date':date, 'timezone':timezone, 'site_no':site_no, 'marker-symbol':'default_marker'}}

#         # print d1
#         geoJsonData.append(dataObject)

# geoJsonData = {'type': 'FeatureCollection', 'features': geoJsonData}
# print geoJsonData
# with open(riverFlowGeoJson, 'w') as outfile:
#     json.dump(geoJsonData, outfile, indent=4, separators=(',', ':'))

