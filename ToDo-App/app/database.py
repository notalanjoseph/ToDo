import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings # for access to env vars(db config)

# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.declarative import declarative_base     # for creating Base class for making table objects

# Base = declarative_base()   # inherited by table objects
# #SQLALCHEMY_DATABASE_URL is 'postgresql://<username>:password>@<ip-address/hostname>/<database_name>'
# SQLALCHEMY_DATABASE_URL = 'postgresql://{}:{}@{}:{}/{}'.format(settings.database_username, settings.database_password, settings.database_hostname, settings.database_port, settings.database_name)
# engine = create_engine(SQLALCHEMY_DATABASE_URL) #needed?
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) #needed?

# # dependency function which gets called by routers
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# db connection using postgres driver to use sql queries. No need if using sqlalchemy
while True:
    try:
        conn = psycopg2.connect(host=f'{settings.database_hostname}', database=f'{settings.database_name}', user=f'{settings.database_username}', password=f'{settings.database_password}', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print("DB connection successful!")
        break
    except Exception as e:
        print("DB connection failed:\n ", e)
        time.sleep(10)