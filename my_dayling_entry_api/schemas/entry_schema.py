from pydantic import BaseModel
from model.entry import Entry
from config import application_settings
from flask import jsonify




class NewEntrySchema(BaseModel):
    """
        Define how the new Entry to insert
        This can be used in parameter in main app.py to represent
        the parameters has expeted in function
    """
    entryID: str = application_settings.ENTRY_ID_EXAMPLE
    title: str = 'My new dayling entry SCHEMA'
    content: str = 'My day today was realy cool SCHEMA'



class GetNewIDToEntry(BaseModel):
    """
        Difine how the ID to new Entry needs return
    
    """
    new_entry_id: str = application_settings.ENTRY_ID_EXAMPLE



def show_entry(entry: Entry):
    """
        Show the entry information
    """
    return {
        'entryID': entry.entryID,
        'title': entry.title,
        'content': entry.content
    }


def show_entry_id(new_id: str):
    
    return jsonify({
                    'entryID': new_id
                    })