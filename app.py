import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
@app.route('/index')
@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('index.html')

@app.route('/skills')
def skills():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)