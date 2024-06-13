


class GlobalDatabaseConfiguration():
    """
        Global database configuration
    """
    
    def __init__(self) -> None:
        
        self.SQLALCHEMY_TRACK_MODIFICATIONS = False
        self.ENTRY_TABEL_NAME = 'Entry'
        self.DB_NAME = 'entrys.db'
        self.DB_PATH = 'db/'
        self.SQLALCHEMY_DATABASE_URI  = f'sqlite:///{self.DB_PATH}/{self.DB_NAME}'
        self.PRE_FIX_TO_ID_GENERATE = 'DAY'
        self.DIGIT_TO_ID_GENERATE = 3
        self.FIELD_CONTENT_ENTRY_SIZE = 500
        self.FIELD_TITLE_SIZE = 100
        self.ENTRY_ID_EXAMPLE = self.PRE_FIX_TO_ID_GENERATE + ('0' * self.DIGIT_TO_ID_GENERATE) # Calculate total digits of PREFIX entry id

        # Calculating the Size of the PK PRIMARY FIELD dinamic based on prefix and digit total variables
        self.FIELD_ENTRY_ID_SIZE = int(len(self.PRE_FIX_TO_ID_GENERATE) + self.DIGIT_TO_ID_GENERATE)
        
        self.INITAL_DATA_TO_POPULATE_DATABASE = 10
        self.INITAL_DATABASE_CHARGE = True