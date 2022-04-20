# PixelCanvas-Minimap-Improved
⚠️ I've stopped working on this after the [2022 april fools update](https://blog.pixelcanvas.io/new-changes/), which unlike a normal april fools "joke", has stuck around after april fools. There is now a huge wait time for anywhere that isn't right next to the center, and captchas stop every placement. I could get around this if I wanted to, but I've lost interest. ⚠️

----

Out of all the code here, what you're probably looking for and what actually works the is **minimap-improved.user.js**, which is an improved userscript for template placement based off of [kekw-420/pixelcanvas-minimap](https://github.com/kekw-420/pixelcanvas-minimap). 

[![Install](https://raw.github.com/jerone/UserScripts/master/_resources/Install-button.png)](https://github.com/LeviOP/PixelCanvas-Minimap-Improved/raw/main/minimap-improved.user.js)

**Main features:**
- Basically just fixes the script. The old script was for an older version of pixelcanvas, and referenced elements that didn't exist, which broke it. 
- Image link can be any from any* domain (old script could only use catbox.moe).
- Script remembers settings (zoom, follow type, grid settings) after reloading the page. You can also update and add templates without reloading the page.
- Script will only run in a single tab - if pixelcanvas is open in multiple tabs, the script won't attempt to run in more than one, which wouldn't work.

\* only domains that allow CORS fetching - meaning that they allow other websites to access their page - will work. Most image sharing websites (imgur, imgbb, etc.) will work totally fine, but some other websites won't.  One specific fix is that cdn.discordapp.com doesn't allow fetching, but discord has a media resizing cdn that does. If your discord image link was `https://cdn.discordapp.com/attachments/something.png`, you could change it to `https://media.discordapp.net/attachments/something.png`.

**How to add templates**:

Templates are JSON objects in an array, which have the following keys:
- **url** - a string containing the full url for the image you'd like to load
- **height** - the height of the image in pixels
- **width** - the width of the image in pixels
- **x** - the x coordinate that the template will be placed
- **y** - the y coordinate the the template will be placed

The url should be a string (surrounded in quotes), and everything else should be just a number (no quotes). For example, the default, which is the wikipedia logo:
```json
[
  {
    "url":"https://raw.githubusercontent.com/LeviOP/PixelCanvas-Minimap-Improved/main/wikipedia-logo-transparent.png",
    "height":77,
    "width":84,
    "x":-319,
    "y":207
  }
]
```

----

This is pretty disorganized and isn't really meant for public use, but if you want to salvage these mostly working files, here's what they do:

 - **auto.user.js** - This is the userscript that automatically places pixels. Right now, it is set only to place the wikipedia logo at -319, 207, [which you might still be able to see](https://pixelcanvas.io/@-265,246) if you go there. It uses a 2d pixel array using colors as numbers from -1 for transparent, and going up across the colors on the bottom of the screen. If you want to try and place your own template, see **imgconvert.js**. 
 - **get-image.js** - Also a userscript, (although not .user.js), this file was meant as a test to show that you can fetch an image from a site without causing any cors errors, and generate a pixel array from it. It is kind of implemented in **minimap-improved.user.js** to load images onto the minimap from any (cors fetch compliant) url. It currently gets an image from a url, then loops through the pixels seeing if they match the 16 pixelcanvas colors, then making a pixelcanvas pixel color 2d array (like generated by **get-image.js**). Doesn't do anything, just logs the array to the console. 
 - **imgconvert.js** - A node.js script that does the same thing as **get-image.js**, but not in the browser. It's what I used to generate the pixels before making the browser version. 
 - **minimap-improved.user.js** - Userscript that creates a minimap in the bottom right of pixelcanvas showing templates. Functionally a placement guide for people that don't want to use any botting. Originally a fork and now more of a code refactor of [kekw-420/pixelcanvas-minimap](https://github.com/kekw-420/pixelcanvas-minimap)  (the code really sucked).
 - **single-auto.user.js** - a version of **auto.user.js** that only works with one account. This was the original script, but while trying to run it with a friend, I realized that it doesn't work. The problem is that it calculates where it should place the next pixel during the wait time, which in theory should be milliseconds faster, but really is useless. I realized this was stupid and made no sense so switched to **auto.user.js** which should work much better. 
