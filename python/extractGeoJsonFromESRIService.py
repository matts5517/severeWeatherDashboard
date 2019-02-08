#-------------------------------------------------------------------------------
# Name:        Parse XML
# Purpose:     read xml files to get current weather obs from the NWS in list or object format for each state and the usa as a whole
# Author:      Matthew Silveira
# Created:     03/07/2018
#-------------------------------------------------------------------------------
import math, os, sys, time, datetime, xml.etree.ElementTree, json
from email.Utils import formatdate
print  time.asctime()
start = time.time()
#Script starts here
#-------------------------------------------------------------------------------
import xml.etree.ElementTree as ET

from xml.dom import minidom
import xml.sax
import urllib
import zipfile
import json

url = 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_mthly_precip_outlk/MapServer/0/query?where=objectid%3E0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=cat%2C+prob&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson'
##urllib.urlretrieve (url,'monthlyPrecip.json')
response = urllib.urlopen(url)
data = json.loads(response.read())
##print data
jsonData = data["features"]
##props = data["properties"]
##print jsonData


jsonArray = []
for item in jsonData:
    props = item["properties"]
    geom  = item["geometry"]["coordinates"]
##    name = item.get("geometry")
##    for item in name:
##        cords = item.get("coordinates")


##    campaignID = item.get("CampaignID")
##    print geom
##    print '#################################################################################################'
    d1 = {'type':'Feature','geometry':{'type':'MultiPolygon', 'coordinates': geom},'properties': props}
##    print d1, 'd1'
    jsonArray.append(d1)

jsonDataFinal = {'type': 'MultiPolygon', 'features': jsonArray}
with open('data2.json', 'w') as outfile:
    json.dump(jsonDataFinal, outfile, indent=4, separators=(',', ':'))







##for wx in cleanWeatherDataList:
##    print wx.tempF, wx.lat, wx.lon, wx.windMPH, wx.visibility, wx.humidity, wx.pressure
##    d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(wx.lon), float(wx.lat)]},
##    'properties': {'temp_f': wx.tempF, 'wind':wx.windMPH,'windGust':wx.windGust ,'humidity':wx.humidity,'pressure':wx.pressure,'visibility':wx.visibility,'marker-symbol':'default_marker'}}
##    print d1, 'd1'
##    jsonData.append(d1)
##
##jsonData = {'type': 'FeatureCollection', 'features': jsonData}
##
##with open('data.json', 'w') as outfile:
##    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))




