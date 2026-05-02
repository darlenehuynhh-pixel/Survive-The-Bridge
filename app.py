from flask import Flask,g, render_template,request,flash
import json
import os
from db_manager import get_db
import json
import psycopg2 
from werkzeug.security import generate_password_hash, check_password_hash
from db_manager import get_db


app = Flask(__name__, )
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret")
app.config.from_file("config.json", load=json.load)
app.config.from_prefixed_env()

@app.teardown_appcontext
def cleanup(exception):
    db = g.get("_database")
    if db:
        db.close()

@app.route("/signUp", methods=["POST"])
def sign_up():
    if request.method =="POST":
        # "" is incase there is no username, strip removes the whitespace
        username = request.form.get("username","").strip()
        password = request.form.get("password","").strip()
        confirmation = request.form.get("confirmation","").strip()

        if not username or not password:
            flash("Please fill all fields!")
            return render_template("signup.html")

        if password != confirmation:
            flash("Passwords don't match")
            return render_template("signup.html")
        conn=None
        try:
            conn = get_db()
            cur = conn.cursor()
            hashed = generate_password_hash(password)
            cur.execute("INSERT INTO users(username,password) VALUES(%s,%s)", (username,hashed))
            conn.commit()
        except psycopg2.Error as e:
            if conn:
                conn.rollback()
            flash("db error")
            print(e)
    return render_template("SignIn.html")

