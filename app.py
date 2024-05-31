from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash


# Inicialização do Flask App
app = Flask(__name__, template_folder='html')
app.secret_key = 'your_secret_key'


# Configuração Inicial do Banco de Dados
def init_sqlite_db():
    conn = sqlite3.connect('database.db')
    print("Opened database successfully")

    conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)')
    print("Table created successfully")
    conn.close()

init_sqlite_db()


# <------! Rota da Página Principal !------>
@app.route('/')
def home():
    username = session.get('username')
    return render_template('index.html', username=username)

# <------! Rota de registo !------>
@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        with sqlite3.connect('database.db') as conn:
            cur = conn.cursor()
            cur.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
            conn.commit()
            flash('You have successfully registered! Please login.', 'success')
            return redirect(url_for('login'))
    
    return render_template('register.html')


# <------! Rota de login !------>
@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        with sqlite3.connect('database.db') as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE username = ?", (username,))
            user = cur.fetchone()
            
            if user and check_password_hash(user[2], password):
                session['logged_in'] = True
                session['username'] = username
                return redirect(url_for('home'))
            else:
                flash('Invalid credentials. Please try again.', 'danger')
    
    return render_template('login.html')


@app.route('/store')
def store():
    return render_template('store.html')


@app.route('/alojamento')
def alojamento():
    return render_template('alojamento.html')


@app.route('/spa_salao')
def spa_salao():
    return render_template('spa-salao.html')


@app.route('/pet_sitting')
def pet_sitting():
    return render_template('pet-sitting.html')

@app.route('/reservajoao')
def reservajoao():
    return render_template('reservajoao.html')

@app.route('/reservaana')
def reservaana():
    return render_template('reservaana.html')
@app.route('/reservacamila')
def reservacamila():
    return render_template('reservacamila.html')
@app.route('/reservacarlos')
def reservacarlos():
    return render_template('reservacarlos.html')
@app.route('/reservafernanda')
def reservafernanda():
    return render_template('reservafernanda.html')
@app.route('/reservajuliana')
def reservajuliana():
    return render_template('reservajuliana.html')
@app.route('/reservalarissa')
def reservalarissa():
    return render_template('reservalarissa.html')
@app.route('/reservalucas')
def reservalucas():
    return render_template('reservalucas.html')
@app.route('/reservamaria')
def reservamaria():
    return render_template('reservamaria.html')
@app.route('/reservapaulo')
def reservapaulo():
    return render_template('reservapaulo.html')
@app.route('/reservapedro')
def reservapedro():
    return render_template('reservapedro.html')
@app.route('/reservarafael')
def reservarafael():
    return render_template('reservarafael.html')

@app.route('/user')
def user():
    return render_template('user.html')

@app.route('/logout/')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)