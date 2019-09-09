import sqlite3 as sql

with sql.connect("database.db") as con:
    con.execute("CREATE TABLE mail_addresses (mail_address TEXT PRIMARY KEY, created TIMESTAMP)")