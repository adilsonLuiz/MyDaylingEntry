from pydantic import BaseModel
from typing import List, Optional
from model.entry import Entry
from config import application_settings
from flask import jsonify





class EntrySchema(BaseModel):
    """
        Define how the new Entry to insert
        This can be used in parameter in main app.py to represent
        the parameters has expeted in function
    """
    entryID: str = application_settings.ENTRY_ID_EXAMPLE
    title: str = 'Title dayling entry SCHEMA'
    content: str = 'My day today was realy cool SCHEMA'
    created: str = '1999-09-29 09:45:54.547831'


class GetNewIDToEntrySchema(BaseModel):
    """
        Difine how the ID to new Entry needs return
    
    """
    new_entry_id: str = application_settings.ENTRY_ID_EXAMPLE


class ListingEntrysSchema(BaseModel):
    """Define How the Entrys needs show the data
    """

    entrys:List[EntrySchema]


class EntrySearchSchema(BaseModel):
    """Define how product is showing.
    """
    
    entryID: str = application_settings.ENTRY_ID_EXAMPLE


def get_all_entrys(entrys: List[Entry]):
    """Return all entrys register in database.

    Args:
        entrys (List[Entry]): Query with all Data to return in response
    """
    
    result = []
    
    # For each entry, append the data and build the response
    for record in entrys:
        
        result.append({
            'entryID': record.entryID,
            'title': record.title,
            'content': record.content,
            'created': record.created,

        })

    return {'entrys': result}


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