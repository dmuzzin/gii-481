# gii-481
Private repo for general image identification project

A plugin for Google Chrome to identify and describe web images that don't have alt-text.

##To install:
Clone the repo
Set up your keys
Open up Chrome/Chromium
Go to settings->extensions
Select the checkbox "Developer Mode"
Click "Load Unpacked Extension"
Select the folder where you cloned the repo
The plugin should now be installed

##Setting up keys:
The plugin requires subscription keys to the Microsoft and Google computer vision APIs.  For security reasons, the keys are in a private submodule repo.  If you want to use this project yourself, you'll need to add a subfolder called "gii-dev-keys".  Inside the folder, add the file "keys.js".  This is where you will define your keys.  Define them as follows:

    var mskey = "your__microsoft_key_here";
    var googkey = "your_google_key_here";
  
Make sure that you keep your keys outside of your source control, or else anyone could copy them.
