from flask import Flask, render_template




app = Flask(__name__)


##-------------route for home page------------------------------##
@app.route('/')
def home():
    return render_template('index.html')


##-------------route for festival & Events----------------------##
@app.route('/fest_event')
def fest_event():
    return render_template('fest.html')


##-----------------route for cottage stay ----------------------##
@app.route('/cottage_stay')
def cottage_stay():
    return render_template('cottage.html')
 
##-----------------route for uttrakhand ------------------------##
@app.route('/uk')
def uk():
    return render_template('uk.html')

##-----------------route for himachal pradesh ------------------##
@app.route('/hp')
def hp():
    return render_template('hp.html')


##-----------------route for himachal pradesh ladakh -----------##
@app.route('/la_hp')
def la_hp():
    return render_template('hp-ladakh.html')


##-----------------route for contact page-----------------------##
@app.route('/contact')
def contact():
    return render_template('contact.html')









if __name__ =='__main__':
    app.run(debug=True)

