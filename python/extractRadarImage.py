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
filePath = 'testRadar.png'
url = 'https://mesonet.agron.iastate.edu/archive/data/2019/02/08/GIS/uscomp/n0q_201902081905.png'
urllib.urlretrieve(url, filePath)

