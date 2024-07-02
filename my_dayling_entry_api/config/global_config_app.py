
from .db_config import GlobalDatabaseConfiguration
from flask_openapi3 import Info, Tag




class GlobalApplicationConfigure(GlobalDatabaseConfiguration):
    """
        Many configuration to application
    """

    def __init__(self):
        
        super().__init__()
        # DEBUG CONFIGURATION
        self.DEBUG = True

        # API Configuration
        self.API_VERSION = '0.0.2'


        # Swagger DOC Configuration TAGS
        self.HOME_TAG = Tag(name='Documentation', description='Basic functions')
        self.TAG_ADD_NEW_ENTRY = Tag(name='New Entry', description='Add new Dayling Entrys notes')
        self.TAG_GET_ID_TO_NEW_ENTRY = Tag(name='Get ID to new Entry', description='Get new ID to entry')
        self.TAG_GET_ENTRYS = Tag(name='Entrys data', description='Get All database entrys data')
        self.TAG_ENTRY_SEARCH = Tag(name='Get entry Note', description='Return data from one unique Entry')
        self.TAG_ENTRY_DELETE = Tag(name='Delete entry', description='Delete entry note from database')
        self.TAG_ENTRY_UPDATE = Tag(name='Update Entry Record', description='Update any entry Record')
        self.TAG_ABOUT_APPLICATION = Tag(name='about application', description='Describe about many informations')
        
        # Swagger DOC Configuration INFOS
        self.INFO_INFORMATION_API = Info(title='My Entry Dayling API', version=self.API_VERSION)






class DevelopementConfiguration(GlobalApplicationConfigure):

    def __init__(self):
        super().__init__()
        self.DEBUG = True

