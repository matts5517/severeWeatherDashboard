#-------------------------------------------------------------------------------
# Name:        Parse XML
# Purpose:     read xml files to get current weather obs from the NWS in list or object format for each state and the usa as a whole
# Author:      Matthew Silveira
# Created:     30/06/2014
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

#url = 'http://w1.weather.gov/xml/current_obs/all_xml.zip'
#urllib.urlretrieve (url,'file.zip')
#
#zippedFile = 'file.zip'
#zipDest = 'testFiles'
#zip_ref = zipfile.ZipFile(zippedFile, 'r')
#zip_ref.extractall(zipDest)
#zip_ref.close()


from xml.dom.minidom import parse
import xml.dom.minidom
class WXData(object):
    """__init__() functions as the class constructor"""
    def __init__(self, location= None, lat=None, lon=None, tempF=None, tempC=None, windMPH=None, obsTime=None,
                humidity=None, pressure=None,visibility=None, windGust=None):
        self.stationID = stationID
        self.location = location
        self.lat = lat
        self.lon = lon
        self.tempF = tempF
        self.tempC = tempC
        self.windMPH = windMPH
        self.obsTime = obsTime
        self.humidity = humidity
        self.pressure = pressure
        self.visibility = visibility
        self.windGust = windGust

# create main weather data list, alter and clean later
weatherDataList =  []
# Directory where xml files should be stored
directory = r'testFiles'
#xmlFile = directory + '\\' + 'KANE.xml'
for filename in os.listdir(directory):
    # XML file name
    xmlFile = directory + '/' + filename
    # create DOM tree
    try:
        DOMTree = xml.dom.minidom.parse(xmlFile)
    except:
        'error'
    collection = DOMTree.documentElement


# Station ID Data ---------------------------------------------------------------------------------##############
    try:
        stationID = os.path.splitext(filename)[0]
        #print stationID
    except:
        print 'no station ID'
    if stationID:
        'yes'
        #stationIDData = str(stationid.childNodes[0].data)
# time data ---------------------------------------------------------------------------------##############
    try:
        obsTime = collection.getElementsByTagName('observation_time')[0]
    except:
        'no time'
    if obsTime:
        try:
            timeData = str(obsTime.childNodes[0].data)

            #print timeData, 'time data'
        except:
            timeData = 'null'
            print 'did not work', 'look here'
# location data ---------------------------------------------------------------------------------##############
    try:
        location = collection.getElementsByTagName('location')[0]
    except:
        'no location'
    if location:
        try:
            locationData = str(location.childNodes[0].data)
        except:
            print 'did not work'
# latitude data ---------------------------------------------------------------------------------##############
    try:
        lat = collection.getElementsByTagName('latitude')[0]
    except:
        'no location'
    try:
        if lat:
            try:
                latData = str(lat.childNodes[0].data)
                #print latData
            except:
                print 'lat did not work'
    except:
        latData = ''
        'no lat'

# longitude data ---------------------------------------------------------------------------------##############
    try:
        lon = collection.getElementsByTagName('longitude')[0]
    except:
        'no location'
    try:
        if lon:
            try:
                lonData = str(lon.childNodes[0].data)
                #print lonData
            except:
                ''
                #print 'lon did not work'
    except:
        lonData = ''
        'no lon'
# tempF data ---------------------------------------------------------------------------------##############
    try:
        tempf = collection.getElementsByTagName('temp_f')[0]
    except:
        'no temp f'
    if tempf:
        tempfData = float(tempf.childNodes[0].data)
       # tempfArray.append(tempfData)
# tempC data ---------------------------------------------------------------------------------##############
    try:
        tempc = collection.getElementsByTagName('temp_c')[0]
    except:
        'no temp c'
    if tempc:
        tempcData = float(tempc.childNodes[0].data)
# windMPH data ---------------------------------------------------------------------------------##############
    try:
        wind_mph = collection.getElementsByTagName('wind_mph')[0]
    except:
        'no wind data'
    if wind_mph:
        try:
            windMphData = float(wind_mph.childNodes[0].data)
        except:
            ''
    # windGust data ---------------------------------------------------------------------------------##############
    try:
        windGust = collection.getElementsByTagName('wind_gust_mph')[0]
    except:
        'no wind data'
    if windGust:
        try:
            windGust = float(windGust.childNodes[0].data)
        except:
            ''
    else:
        ''
        #print 'wind gust failed'

# Humidity data ---------------------------------------------------------------------------------##############
    try:
        humidity = collection.getElementsByTagName('relative_humidity')[0]
    except:
        'no humidity data'
        #print 'no humidity data'
        humidity = -1
    if humidity <> -1:
        humidity = float(humidity.childNodes[0].data)

# Pressure data ---------------------------------------------------------------------------------##############
    try:
        pressure = collection.getElementsByTagName('pressure_mb')[0]
    except:
        'no pressure data'
    try:
        if pressure:
            pressure = float(pressure.childNodes[0].data)
    except:
        pressure = -1

# Visibility data ---------------------------------------------------------------------------------##############
    try:
        visbility = collection.getElementsByTagName('visibility_mi')[0]
    except:
        'no visibility data'
    try:
        if visbility:
            visbility = float(visbility.childNodes[0].data)
    except:
        visbility = -1

    # append the weather data per xml station parse in list
    weatherDataList.append(WXData( locationData,latData, lonData, tempfData, tempcData, windMphData,
                                    timeData, humidity, pressure, visbility, windGust))

print len(weatherDataList), ' == number of stations of list before unknown station removal'


# work with getting the correct time.
currentTime = time.asctime()
print currentTime
timeList  = currentTime.split(' ')
print timeList

print weatherDataList
# clean weather data list
cleanWeatherDataList = []
for wx in weatherDataList:
    print wx
    stationTimeList  = wx.obsTime.split(' ')
##    print stationTimeList
    #print stationTimeList, '    ', timeList
    if len(str(stationTimeList[4])) ==1:
        stationTimeList[4] = '0' + stationTimeList[4]

##        print stationTimeList[4], 'look here for day'

    stationMDY = str(stationTimeList[3]) + ' ' + str(stationTimeList[4]) + ' ' + str(stationTimeList[5])
    stationMDY = stationMDY[:-1]
    currentMDY = str(timeList[1]) + ' ' + str(timeList[2]) + ' ' + str(timeList[4])
    currentHour = timeList[3].split(':')[0]
    if stationTimeList[7] == 'am':
        stationHour  = stationTimeList[6].split(':')[0]
    else:
        stationHour = int(stationTimeList[6].split(':')[0]) + 12
    print stationHour, 'station hour'
##    print currentHour, stationHour, stationTimeList[8], wx.obsTime, wx.location
##    print stationMDY, '         ', currentMDY

    if str(stationMDY) != str(currentMDY):

        print 'remove station based on time'
        #weatherDataList.pop(5)
        ''


    elif wx.location == 'Unknown Station':
        'unknown station'
         #print 'unknown station'

    elif wx.tempF > 134:
        'temps out of extreme range'
    elif wx.tempF < -100:
        'temps out of extreme range'
    else:
        cleanWeatherDataList.append(wx)
        #print wx.tempF, wx.location

print len(cleanWeatherDataList), ' == number of stations of list after unknown station removal'

print cleanWeatherDataList
# Build json file for all stations with temp and locations
jsonData = []
for wx in cleanWeatherDataList:
    print wx.tempF, wx.lat, wx.lon, wx.windMPH, wx.visibility, wx.humidity, wx.pressure
    d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(wx.lon), float(wx.lat)]},
    'properties': {'temp_f': wx.tempF, 'wind':wx.windMPH,'windGust':wx.windGust ,'humidity':wx.humidity,'pressure':wx.pressure,'visibility':wx.visibility,'marker-symbol':'default_marker'}}
    print d1, 'd1'
    jsonData.append(d1)

jsonData = {'type': 'FeatureCollection', 'features': jsonData}

with open('data.json', 'w') as outfile:
    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))


#print weatherDataList

for wx in cleanWeatherDataList:
    'hold'
    #print wx.location, wx.tempF, wx.windMPH



# sort weather data array by data type of choice
import operator
tempFSort = 'yes'
if tempFSort == 'yes':
    cleanWeatherDataList.sort(key=operator.attrgetter('tempF'))
    for wx in cleanWeatherDataList:
        'holder'
        #print wx.tempF ,wx.location, wx.windMPH
        #print type(wx.location), wx.location

#print cleanWeatherDataList[0:10]
print ''
print 'Top 10 warmest temps below #################################################'
w=5
tenWarmJson = []
for wx in cleanWeatherDataList[(len(cleanWeatherDataList) - 10):len(cleanWeatherDataList)]:
    print str(w)+':', wx.tempF, wx.location,wx.lat, wx.lon, wx.windMPH, wx.obsTime
    w-=1
    d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(wx.lon), float(wx.lat)]},
    'properties': {'title': 'MapBox DC', 'marker-symbol':'default_marker'}, 'temp_f':str(wx.tempF), 'wind':'34' }
    tenWarmJson.append(d1)

jsonData = {'type': 'FeatureCollection', 'features': tenWarmJson}
with open('tenWarm.json', 'w') as outfile:
    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))



print ''
print 'Top 10 coldest temps below #################################################'
c =1
tenColdJson = []
for wx in cleanWeatherDataList[0:10]:
    print str(c)+ ':',wx.tempF, wx.location,wx.lat, wx.lon, wx.windMPH, wx.stationID, wx.obsTime
    c+=1
    d1 = {'type':'Feature','geometry':{'type':'Point', 'coordinates': [float(wx.lon), float(wx.lat)]},
    'properties': {'title': 'MapBox DC', 'marker-symbol':'default_marker'}, 'temp_f':str(wx.tempF), 'wind':'34' }
    tenColdJson.append(d1)

jsonData = {'type': 'FeatureCollection', 'features': tenColdJson}
with open('tenCold.json', 'w') as outfile:
    json.dump(jsonData, outfile, indent=4, separators=(',', ':'))

# sort by windspeed values
windSort = 'yes'
if windSort == 'yes':
    weatherDataList.sort(key=operator.attrgetter('windMPH'))
    for wx in weatherDataList:
        'hold'
        #print wx.windMPH, wx.tempF ,wx.location

# -------------------------------------------------------------------
#Script ends here
print time.asctime()
end = time.time()
totalmins = int((end - start) / 60)
print "Script ran for ",totalmins, "Minutes"
print "Script successful"