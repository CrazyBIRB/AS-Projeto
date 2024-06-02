from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash


# Inicialização do Flask App
app = Flask(__name__, template_folder='html')
app.secret_key = 'your_secret_key'


# Configuração Inicial do Banco de Dados
def init_sqlite_db():
    conn = sqlite3.connect('database.db')
    print("Opened database successfully")

    conn.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    username TEXT,
                    email TEXT, 
                    password TEXT)''')
    
    conn.execute('''CREATE TABLE IF NOT EXISTS purchases (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    product_name TEXT,
                    product_price REAL,
                    product_type TEXT,
                    product_image TEXT,
                    FOREIGN KEY(user_id) REFERENCES users(id))''')
    print("Tables created successfully")
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
        email = request.form['email']
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        with sqlite3.connect('database.db') as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email = ?", (email,))
            existing_user = cur.fetchone()
            
            if existing_user:
                flash('Email already exists. Please use a different email.', 'danger')
                return redirect(url_for('register'))
            else:
                cur.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", (username, email, hashed_password))
                conn.commit()
                flash('You have successfully registered! Please login.', 'success')
                return redirect(url_for('login'))
    
    return render_template('register.html')



# <------! Rota de login !------>
@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        with sqlite3.connect('database.db') as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email = ?", (email,))
            user = cur.fetchone()
            
            if user and check_password_hash(user[3], password):
                session['logged_in'] = True
                session['username'] = user[1]
                session['email'] = user[2]
                return redirect(url_for('home'))
            else:
                flash('Invalid credentials. Please try again.', 'danger')
    
    return render_template('login.html')


@app.route('/store')
def store():
    username = session.get('username')
    return render_template('store.html', username=username)


@app.route('/finalizar_compra', methods=['POST'])
def finalizar_compra():
    if 'username' not in session:
        return redirect(url_for('login'))

    data = request.get_json()
    items = data['items']

    username = session['username']
    with sqlite3.connect('database.db') as conn:
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE username = ?", (username,))
        user_id = cur.fetchone()[0]

        for item in items:
            cur.execute("INSERT INTO purchases (user_id, product_name, product_price, product_type, product_image) VALUES (?, ?, ?, ?, ?)",
                        (user_id, item['name'], item['price'], item['type'], item['image']))
        conn.commit()

    return '', 200


@app.route('/alojamento')
def alojamento():
    username = session.get('username')
    return render_template('alojamento.html', username=username)


@app.route('/spa_salao')
def spa_salao():
    username = session.get('username')
    return render_template('spa-salao.html', username=username)


@app.route('/pet_sitting')
def pet_sitting():
    username = session.get('username')
    return render_template('pet-sitting.html', username=username)

@app.route('/reservajoao')
def reservajoao():
    username = session.get('username')
    return render_template('petsitting/reservajoao.html', username=username)

@app.route('/reservaana')
def reservaana():
    username = session.get('username')
    return render_template('petsitting/reservaana.html', username=username)

@app.route('/reservacamila')
def reservacamila():
    username = session.get('username')
    return render_template('petsitting/reservacamila.html', username=username)

@app.route('/reservacarlos')
def reservacarlos():
    username = session.get('username')
    return render_template('petsitting/reservacarlos.html', username=username)

@app.route('/reservafernanda')
def reservafernanda():
    username = session.get('username')
    return render_template('petsitting/reservafernanda.html', username=username)

@app.route('/reservajuliana')
def reservajuliana():
    username = session.get('username')
    return render_template('petsitting/reservajuliana.html', username=username)

@app.route('/reservalarissa')
def reservalarissa():
    username = session.get('username')
    return render_template('petsitting/reservalarissa.html', username=username)

@app.route('/reservalucas')
def reservalucas():
    username = session.get('username')
    return render_template('petsitting/reservalucas.html', username=username)

@app.route('/reservamaria')
def reservamaria():
    username = session.get('username')
    return render_template('petsitting/reservamaria.html', username=username)

@app.route('/reservapaulo')
def reservapaulo():
    username = session.get('username')
    return render_template('petsitting/reservapaulo.html', username=username)

@app.route('/reservapedro')
def reservapedro():
    username = session.get('username')
    return render_template('petsitting/reservapedro.html', username=username)

@app.route('/reservarafael')
def reservarafael():
    username = session.get('username')
    return render_template('petsitting/reservarafael.html', username=username)

@app.route('/user')
def user():
    if 'username' not in session:
        return redirect(url_for('login'))

    username = session['username']
    with sqlite3.connect('database.db') as conn:
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE username = ?", (username,))
        user_id = cur.fetchone()[0]

        cur.execute("SELECT product_name, product_price, product_type, product_image FROM purchases WHERE user_id = ?", (user_id,))
        purchases = cur.fetchall()

    return render_template('user.html', username=username, purchases=purchases)

@app.route('/logout/')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
