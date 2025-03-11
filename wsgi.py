import sys
import os

# Set the path to your project
project_home = '/home/adhikarisulav/Calculator'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Import Flask app
from app import app as application
