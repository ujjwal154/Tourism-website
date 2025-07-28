from flask import Flask, render_template, redirect, request, flash
import stripe
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import smtplib
from bson import ObjectId


app = Flask(__name__)
load_dotenv()

stripe.api_key = 'sk_test_51RndPyFMEvNzh2d7xcmqwMGznwGzMLYjjqkg2k4hhNa7lpzmGQ1D126xSWEJ2Y2g79U1RAbcRwGU435VzEkIr2w000cnwlzXJv'  # STRIPE_SECRET_KEY
YOUR_DOMAIN = 'http://localhost:5000' 

client = MongoClient(os.getenv("MONGO_URI"))
db = client['travelapp']

booking = db['travelbookings']
hotel_collection = db['hoteldetails']
uk_hotels = db['ukhotels']
bookings = db['hotel-bookings']


EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

##-------------route for home page------------------------------##
@app.route('/')
def home():
    return render_template('index.html')


##-------------route for festival & Events----------------------##
@app.route('/fest_event')
def fest_event():
    #getting travel packages
    package = db.travelbookings.find()
    return render_template('fest.html', package=package)


##-----booking travel package--------------------------##
@app.route('/book_package/<package_id>')
def book_package(package_id):
    #get selected package detail
    selected_package = db.travelbookings.find_one({"_id": ObjectId(package_id)},
                                                  {"_id":0, "package_name":1, "duration":1, "price_p":1, "price":1, "image":1})
    return render_template('bookage.html', package = selected_package)

##-------travel - package checkout -----------------##
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    package_name = request.form['name']
    persons = int(request.form['persons'])
    price_per_person =int(request.form['total_price'])  # You can make this dynamic per package

    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': 'inr',
                'product_data': {
                    'name': f"{package_name} Booking",
                },
                'unit_amount': price_per_person * 100,  # Stripe uses paise
            },
            'quantity': persons,
        }],
        mode='payment',
        success_url=YOUR_DOMAIN + '/success',
        cancel_url=YOUR_DOMAIN + '/cancel',
        metadata={
            'customer_name': request.form['name'],
            'customer_email': request.form['email']
        }
    )
    return redirect(session.url, code=303)


##-----------------route for cottage stay ----------------------##
@app.route('/cottage_stay')
def cottage_stay():
    uk_hotel = uk_hotels.find()
    return render_template('cottage.html', uk_hotel=uk_hotel)
 

##-----------------route for view hotels ----------------------##
@app.route('/hotel-stay', methods=['Post'])
def hotel_stay():
    location = request.form['destination']

    #get hotel details with selected location 
    hotel = list(hotel_collection.find({"location":location}))
    uk_hotel = uk_hotels.find()
    
    return render_template('cottage.html', hotel=hotel, uk_hotel=uk_hotel)

##----------------route for hotel booking---------------------------##
@app.route('/hotel-book/<hotel_id>')
def hotel_book(hotel_id):
    #fetch hotel details
    selected_hotel = hotel_collection.find_one({"_id":ObjectId(hotel_id)})
    if not selected_hotel:
        selected_hotel = uk_hotels.find_one({"_id":ObjectId(hotel_id)})
        if not selected_hotel:
            return "hotel not found", 404
        
    return render_template('hotel_booking.html', hotel = selected_hotel)

#-------------route fro book hotel------------------------------##
@app.route('/book-hotel', methods=['POST'])
def hotel_booking():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    guests = request.form['guests']
    checkin = request.form['checkin']
    checkout = request.form['checkout']

    data = {"customer_name":name, "email":email, "phone":phone, "no.ofguest":guests, "check-in-date":checkin, "check-out-date":checkout}

    #insert bookings into db 
    bookings.insert_one(data)
    return redirect('/success')

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



@app.route('/success')
def success():
    return render_template('success.html')

@app.route('/cancel')
def cancel():
    return "Payment canceled. Try again."

##-----------------route for contact page-----------------------##
@app.route('/contact', methods=['GET' ,'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        sender_email = request.form['email']
        reigon = request.form['region']
        subject = request.form['subject']

        full_message = f"Name: {name}\nEmail: {sender_email}\n Phone: {phone}\n\nMessage:\n{subject}"

        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(EMAIL_USER, EMAIL_PASS)
                smtp.sendmail(
                    from_addr=sender_email,
                    to_addrs=EMAIL_USER, 
                    msg=f"Subject: New Contact Form Message\n\n{full_message}"
                )
        except Exception as e:
            print("Error:", e)
        return redirect('/')

    return render_template('contact.html')









if __name__ =='__main__':
    app.run(debug=True)

