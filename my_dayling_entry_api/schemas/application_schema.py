from pydantic import BaseModel
from typing import List, Optional
from model.entry import Entry
from config import application_settings
from flask import jsonify



class AboutInformationSchema(BaseModel):
    """define how about Information is defined
    """
    api_version: str = application_settings.API_VERSION