# Project Setup Guide


## Setting Up the Django Backend

### Prerequisites

Check if python is installed.

Run `python3 --version` or `python --version`.
If Python is not installed, download and install it from python.org


Check if pip package manager is installed.

Run `pip --version`.
If not install run `python3 -m pip install --upgrade pip setuptools wheel` to install.

## Installation Steps fo Djago

Run `source venv/bin/activate` in the root project directory. `cd backend` and install the following. If already installed skip running the server.  

Run `python3 -m pip install Django`.
Check if install by running `django-admin --version`.

Within the backend directory install the following Django frameworks:

Run `pip install djangorestframework`.

Run `pip install django-cors-headers`.

Run `pip install psycopg2-binary`.

Run `pip install PyJWT`.

Run `pip install daphne`.

Run `pip install channels`.

Run `pip install supabase`.

Now you can run `python3 manage.py runserver`. 
This will set up Django's environment and links.

In another terminal start the redis-server. Ensure the VENV is started and cd to the backend and type the command `redis-server`. If not found you may have to install redis.

## Setting up the React App

### Prerequisites
Ensure that Node.js and npm (Node Package Manager) are installed on your system. These are necessary to manage the project's frontend dependencies and to run the development server.

Change directory to /Serenity/web.
Run `npm install` and then `npm start`.

The webpage should load correctly.

## Mobile
Start the server via `npx expo start`.
`mobile/lib/helper/djangoURL.JS`, edit this accordingly whether you are using an emulator or your personal device. It is required so that your requests to django are sent to the right place. If using personal device (expo go app), start django server with command `python3 manage.py runserver X.X.X.X:PORT`. X.X.X.X should be your own computers IP and PORT should be 8000. Note, running the django server on your computers local IP is not yet supported by the website (it expects localhost); it should only be used for mobile development.