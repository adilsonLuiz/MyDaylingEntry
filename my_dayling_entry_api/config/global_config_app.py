
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
        self.API_VERSION = '0.0.1'


        # Swagger DOC Configuration TAGS
        self.HOME_TAG = Tag(name='Documentation', description='Basic functions')
        self.TAG_ADD_NEW_ENTRY = Tag(name='New Entry', description='Add new Dayling Entrys notes')
        self.TAG_GET_ID_TO_NEW_ENTRY = Tag(name='Get ID to new Entry', description='Get new ID to entry')
        self.TAG_GET_ENTRYS = Tag(name='Entrys data', description='Get All database entrys data')
        
        # Swagger DOC Configuration INFOS
        self.INFO_INFORMATION_API = Info(title='My Entry Dayling API', version=self.API_VERSION)






class DevelopementConfiguration(GlobalApplicationConfigure):

    def __init__(self):
        super().__init__()
        self.DEBUG = True

