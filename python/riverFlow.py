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
from lxml import html
import requests
url = 'http://www.dwr.state.co.us/surfacewater/data/district.aspx?&dist=all&type=ALL'
page = requests.get(url)
tree = html.fromstring(page.content)
print tree
buyers = tree.xpath('//div[@class="currentdata"]/text()')
print buyers

import urllib2
from bs4 import BeautifulSoup
 # -*- coding: utf-8 -*-
url = 'http://www.dwr.state.co.us/surfacewater/data/district.aspx?&dist=all&type=ALL'
page = urllib2.urlopen(url)
# parse the html using beautiful soup and store in variable `soup`
soup = BeautifulSoup(page, ‘html.parser’)



filePath = 'data/geoJson/riverFlowData.json'
riverFlowGeoJson = 'data/geoJson/riverFlowGeoJsonData.json'
url = 'https://waterwatch.usgs.gov/webservices/realtime?region=co&format=json'
urllib.urlretrieve(url, filePath)
# with open(filePath, "rb") as f:
geoJsonData = []
with open(filePath) as json_file:  
    data = json.load(json_file)
    for site in data['sites']:
        flow = site['flow']
        print flow
        stationName = site['station_nm']
        percentile = float(str(site['percentile']))
        try:
            percent_mean = float(str(site['percent_mean']))
        except:
            percent_mean = float(0.0)
        try:
            percent_median = float(str(site['percent_median']))
        except:
            percent_median = float(0.0)

        date = site['flow_dt']
        timezone = site['tz_cd']
        site_no = site['site_no']
        lat = site['dec_lat_va']
        lon = site['dec_long_va']

        dataObject = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(lon), float(lat)]},
                        'properties': {'flow': flow, 'stationName': stationName, 'percentile':percentile,
                        'percent_mean': percent_mean, 'percent_median': percent_median, 
                        'date':date, 'timezone':timezone, 'site_no':site_no, 'marker-symbol':'default_marker'}}

        # print d1
        geoJsonData.append(dataObject)

geoJsonData = {'type': 'FeatureCollection', 'features': geoJsonData}
print geoJsonData
with open(riverFlowGeoJson, 'w') as outfile:
    json.dump(geoJsonData, outfile, indent=4, separators=(',', ':'))

