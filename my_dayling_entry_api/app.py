
from flask import redirect, Flask,  request
from database.database import EntryDatabase, Database
from config import  application_settings
from schemas import *
from model import Entry
from config.logger import logger
from flask_openapi3 import OpenAPI
from flask_cors import CORS


app_config = application_settings

# Initilize API with the OpenAPI
app = OpenAPI(__name__, info=app_config.INFO_INFORMATION_API)

CORS(app)

# Initialize
entry_db_session = EntryDatabase()
print(entry_db_session)
    
# APP ROUTES

@app.get('/', tags=[app_config.HOME_TAG])
def home():
    """
        Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
        
    return redirect('/openapi')


@app.post('/new_entry', tags=[app_config.TAG_ADD_NEW_ENTRY],
          responses={'200':EntrySchema, '409': ErrorSchema, '400': ErrorSchema}
        )
def new_entry(form: EntrySchema):
    """Add new Entry to database
    """

    
    #Build new product
    new_entry = Entry(
        entryID=form.entryID,
        title=form.title,
        content=form.content
        )

    logger.debug(f'Adding new Entry to DB..')

    try: # Try conect with the database and insert new Entry

        entry_db_session.session.add(new_entry)
        entry_db_session.session.commit()
        logger.debug('New Entry add sucessfull!')
        # Call my schema to show the entry
        return show_entry(new_entry), 200

    except Exception as err:
            logger.warning(f'An error is occurrend durant insert..')
            return {'mesage': err}


@app.get('/generate_new_entry_id', tags=[app_config.TAG_GET_ID_TO_NEW_ENTRY], 
          responses={'200': GetNewIDToEntrySchema, '400': ErrorSchema}
          )
def generate_new_entry_id():
    """Return new entryID genereted.

    Returns:
        str: Object
    """
    #FIXME não consigo saber se o retorno é o conteudo 200 ou nao

    new_entry_id = entry_db_session.get_next_entry_id()

    if new_entry_id:
        print('Retornando 200 generate new entry')
        return show_entry_id(new_entry_id)
    else:
        print('Retornando 400 generate new entry')
        return 'error', 400


@app.get('/entrys', tags=[app_config.TAG_GET_ENTRYS],
         responses={'200': ListingEntrysSchema, '404': ErrorSchema})
def get_all_entrys():
    """Get all entrys in database and return it
    """

    result = entry_db_session.get_all_data()
    
    return result