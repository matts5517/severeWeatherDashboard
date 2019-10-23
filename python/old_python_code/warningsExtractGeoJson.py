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



url = 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/1/query?where=prod_type+%3D+%27Flood+Warning%27+or+prod_type+%3D+%27Tornado+Warning%27+or+prod_type+%3D+%27Flash+Flood+Warning%27+or+prod_type+%3D+%27Flash+Flood+Watch%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=objectid&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson'
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

##    print '#################################################################################################'
    d1 = {'type':'Feature','geometry':{'type':'MultiPolygon', 'coordinates': geom},'properties': props}
##    print d1, 'd1'
    jsonArray.append(d1)

jsonDataFinal = {'type': 'MultiPolygon', 'features': jsonArray}
with open('watch_warn.json', 'w') as outfile:
    json.dump(jsonDataFinal, outfile, indent=4, separators=(',', ':'))