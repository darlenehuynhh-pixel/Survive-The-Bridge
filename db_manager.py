import psycopg2
from flask import g, current_app as app

def get_db():
    db = g.get("_database")
    if not db:
        g._database = psycopg2.connect(dbname = app.config["DBNAME"], user = app.config["DBUSER"], password = app.config["DBPASS"], host = app.config["DBHOST"], port = app.config["DBPORT"])
        db = g._database
    return db
