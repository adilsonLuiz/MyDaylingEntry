from pydantic import BaseModel



class ErrorSchema(BaseModel):
    """
        Define how the error mesage is represent
    """
    mesage: str


def database_empty_error():
    
    return {
        'errorMsg': 'The database is Empyt!'
    }
    

def record_not_found_error():
    
    return {
        'erroMsg': 'The Record is not found in the database'
    }


def prefix_not_found_in_database():
    
    return {
        'errorMsg': 'This PREFIX dont exist in the database, please insert an new record and try againn'
    }