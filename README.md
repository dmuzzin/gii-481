# Alt-Text Chrome Extension
This Google Chrome extension makes use of Google's Cloud Vision API and Microsoft's Computer Vision API to to add alt-attributes to images on the web, so the visually impaired (who rely on screen-readers to surf the web) can get contextual information from images as well as entertainment (OCR/memes).

## To install:
Clone the repo
Set up your keys
Open up Chrome/Chromium
Go to settings->extensions
Select the checkbox "Developer Mode"
Click "Load Unpacked Extension"
Select the folder where you cloned the repo
The plugin should now be installed

## Setting up keys:
The plugin requires subscription keys to Microsoft and Google Computer Vision APIs. For security reasons, the keys are in a private submodule repo. If you want to use this project yourself, you'll need to add a subfolder called "server/gii-dev-keys". Inside the folder, add the file "keys.js". This is where you will define your keys. Define them as follows:

    var mskey = "your__microsoft_key_here";
    var gcvkey = "your_google_key_here";

Make sure that you keep your keys outside of your source control.
