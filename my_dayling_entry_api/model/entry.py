from sqlalchemy import Column, Integer, String, DateTime
from model.base import Base
from datetime import datetime
from typing import Union
from config import application_settings


# Entry table model



class Entry(Base):
    """
        This class is model to create a new Entry model to insert in table
    """
    #__tablename__ = get_app_config('TABEL_NAME')
    __tablename__ = application_settings.ENTRY_TABEL_NAME


    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    entryID = Column(String(application_settings.FIELD_CONTENT_ENTRY_SIZE))
    title = Column(String(application_settings.FIELD_TITLE_SIZE))
    content = Column(String(application_settings.FIELD_CONTENT_ENTRY_SIZE))
    created = Column(DateTime,default=datetime.now())


    def __init__(self, entryID:str, title: str, content: str,
                 create: Union[None] = None):
        """
            Create new Entry object

            Arguments:
                entryID: Unique ID to new Entry in database
                title: Title of entry
                content: Content of entry
                create: Date of entry has been created
        """
        self.entryID = entryID
        self.title = title
        self.content = content

        if create: # Check if the create date is comming
            self.create = create
