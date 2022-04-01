// ==UserScript==
// @name         Multi User wikipedia
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Levi_OP
// @match        *://pixelcanvas.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixelcanvas.io
// @grant        none
// ==/UserScript==
/*globals  store isSameColorIn tryPlacePixel toast*/

(function() {
    'use strict';

    let pixels = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,2,0,0,2,2,2,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,0,0,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,2,1,1,2,1,0,1,2,1,2,1,2,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,1,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,2,-1,-1,-1,-1,-1,1,1,2,1,1,1,1,2,1,1,2,2,1,1,2,2,2,1,2,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,1,2,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,1,2,1,1,2,1,2,2,3,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,0,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,2,1,2,1,1,3,2,2,2,3,3,2,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,1,0,1,0,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,1,1,1,0,1,1,1,2,1,2,1,1,1,1,2,1,2,1,2,1,1,1,2,1,1,2,1,3,2,3,2,2,2,2,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,3,2,0,1,1,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,3,2,2,3,1,1,2,1,1,1,1,1,1,2,2,1,2,1,2,1,3,2,1,3,2,2,1,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,0,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,0,2,3,1,1,1,3,0,2,2,1,1,1,2,1,2,1,2,1,1,2,1,1,1,3,3,2,2,2,2,1,2,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,0,0,1,1,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,0,1,0,1,1,2,1,0,2,2,0,3,2,0,2,1,1,1,2,1,1,1,2,1,1,2,1,2,2,2,1,1,2,1,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,0,1,1,1,1,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,1,2,1,1,0,2,1,0,2,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,2,1,2,1,1,1,2,2,1,2,1,2,1,1,2,1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,0,0,1,1,0,1,1,2,1,1,0,2,2,1,1,1,1,1,2,1,1,2,1,1,2,1,2,2,2,1,2,2,1,2,1,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,1,1,1,1,1,0,1,1,0,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,0,1,1,1,1,1,1,1,0,1,1,1,2,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,2,2,1,2,2,1,2,2,2,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,0,1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,3,-1,-1,-1,-1,-1,-1,-1,2,2,2,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,1,2,1,2,1,2,1,1,2,1,1,2,2,2,2,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,0,1,1,0,1,2,1,0,1,1,0,0,1,2,-1,-1,-1,-1,-1,2,3,2,2,2,-1,2,3,2,3,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,2,1,1,1,2,1,2,1,2,2,1,2,2,1,2,1,2,2,-1,-1,-1,-1,-1],[-1,-1,-1,-1,1,1,1,1,0,0,2,2,1,1,1,0,0,0,1,2,-1,-1,-1,-1,-1,3,2,2,3,3,3,3,2,2,2,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,2,1,1,1,2,1,1,2,1,2,1,2,1,2,2,2,2,2,2,2,-1,-1,-1,-1,-1],[-1,-1,-1,-1,1,1,2,2,2,2,2,1,0,1,0,1,0,1,2,1,-1,-1,-1,-1,-1,2,3,2,2,2,2,2,2,3,3,2,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,2,1,2,3,2,1,2,2,2,-1,-1,-1,-1],[-1,-1,-1,1,1,1,3,2,2,2,1,0,1,1,1,1,1,1,2,-1,-1,-1,-1,2,2,2,2,2,2,2,2,3,2,2,2,2,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,2,1,2,1,2,1,1,1,2,3,2,2,1,2,2,-1,-1,-1,-1],[-1,-1,-1,1,1,1,0,0,2,2,1,1,0,1,2,2,3,2,2,3,3,2,2,2,2,2,3,2,3,2,3,2,2,3,2,3,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,2,1,2,2,2,2,2,3,2,2,2,2,2,-1,-1,-1],[-1,-1,-1,1,1,1,0,1,1,1,1,1,0,2,2,3,2,3,3,2,2,3,3,2,3,2,2,3,2,2,2,2,3,2,2,3,2,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,3,2,1,2,2,2,-1,-1,-1],[-1,-1,1,1,1,1,1,1,1,0,1,0,1,2,2,2,2,2,2,3,2,2,2,2,2,3,2,2,3,2,3,2,2,2,3,2,2,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,2,2,1,1,2,2,2,1,1,2,1,1,1,1,2,1,1,2,2,2,0,2,3,1,2,2,2,-1,-1,-1],[-1,-1,1,1,1,1,1,1,1,0,1,0,1,2,3,2,3,2,2,2,3,2,2,3,2,2,3,2,2,2,3,2,3,3,2,3,2,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,2,1,3,1,1,1,1,1,1,2,1,1,2,1,2,2,1,2,2,1,2,3,2,3,2,2,1,2,2,2,-1,-1],[-1,-1,1,1,1,1,1,1,1,1,0,1,1,2,2,2,2,2,3,2,2,2,3,2,3,2,2,2,3,3,2,2,2,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,2,3,1,2,2,1,2,1,1,1,2,1,1,1,1,1,1,2,1,1,2,1,1,2,1,2,3,3,2,1,2,2,2,2,-1,-1],[-1,-1,1,1,1,1,1,0,1,0,1,0,1,2,3,3,3,3,2,3,3,3,2,2,2,2,3,2,2,0,1,0,0,0,0,0,1,1,1,1,0,1,0,0,1,2,3,1,1,3,2,1,1,1,2,1,1,2,1,1,2,1,2,1,2,1,1,2,1,2,2,1,2,1,2,2,1,2,2,2,1,2,-1,-1],[-1,1,1,1,1,1,0,1,1,1,0,1,1,2,2,2,2,2,2,1,1,2,2,3,2,3,1,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,1,1,1,1,3,3,0,0,3,3,0,2,2,0,1,1,2,1,1,1,1,2,2,1,2,1,2,1,1,2,2,2,1,2,2,2,1,2,2,2,2,-1],[-1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2,3,2,2,2,0,0,0,0,1,0,0,1,0,0,1,1,0,1,0,1,0,1,0,0,3,2,0,1,3,1,0,2,1,1,1,1,2,2,1,2,2,1,1,2,1,1,2,2,1,1,1,2,1,2,1,2,2,2,2,2,-1],[-1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,1,0,0,1,1,2,2,3,2,3,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1,3,1,0,2,3,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1,2,1,1,1,2,2,2,1,2,2,2,1,2,2,2,-1],[-1,1,0,1,1,0,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,3,3,2,2,3,3,1,1,0,0,1,0,0,0,0,0,1,2,0,1,1,1,0,1,0,1,0,2,3,2,1,2,3,2,0,1,1,1,1,1,1,1,2,1,2,1,2,1,2,2,2,2,1,1,2,2,2,1,2,2,2,2,-1],[-1,1,1,1,3,2,0,1,0,0,1,0,1,1,0,0,0,1,0,0,0,2,3,2,2,2,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,2,3,1,0,2,1,1,1,1,2,1,2,1,1,1,2,1,2,1,1,1,1,2,1,2,2,1,2,2,2,2,1,2,2,-1],[-1,1,1,1,2,3,1,0,1,1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,2,2,1,1,2,1,2,1,2,2,1,2,2,2,-1],[1,1,0,2,2,2,3,1,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,1,0,1,0,0,1,0,1,1,1,1,0,0,0,1,1,1,1,2,1,2,1,1,2,1,1,2,1,2,1,2,2,1,2,2,1,2,1,2,2,1,2,2,2,2,-1],[1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,2,2,2,1,0,0,0,0,1,1,1,0,0,1,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,2,1,2,1,2,1,1,2,1,2,2,1,2,2,1,2,2,2,2,2,-1],[1,1,1,1,2,2,0,0,1,1,1,1,1,0,0,1,0,1,0,0,0,2,2,2,1,2,3,2,0,0,0,1,1,0,1,0,0,0,0,1,1,0,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,1,2,1,2,2,1,2,1,2,3,2,2,2,2],[1,1,0,2,2,3,1,0,1,1,1,1,0,1,1,0,0,0,1,0,2,3,0,0,0,0,3,3,1,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,2,2,2,1,1,1,1,2,1,2,1,2,1,1,2,2,2,2,2,3,2,2,1],[1,1,0,2,2,1,2,1,1,1,1,0,0,1,0,1,0,1,0,0,3,2,0,0,0,0,1,3,2,0,0,1,2,1,1,1,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,2,2,1,1,1,1,2,1,2,2,1,2,1,2,1,2,2,2,1,2,2,2,2,2,2,2],[1,1,0,1,2,3,2,0,1,1,0,1,1,0,1,0,1,0,0,0,3,2,0,0,1,0,0,3,2,0,0,0,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,2,1,2,1,1,1,2,2,2,2,3,2,2,-1],[1,1,1,1,2,2,0,1,1,1,1,1,1,0,1,0,0,1,0,0,3,2,0,0,0,0,1,3,1,0,0,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,2,2,1,2,1,2,1,2,1,2,2,2,1,2,2,2,2,2,2,-1],[1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1,1,0,1,0,2,3,2,0,0,1,2,2,0,1,0,0,0,1,0,0,1,0,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,2,1,2,1,2,1,2,2,3,2,2,2,2,-1],[-1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1,0,0,0,1,2,1,0,1,3,2,3,2,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,2,1,2,2,2,1,1,2,1,1,1,2,1,2,1,2,1,2,2,1,2,2,3,2,2,-1],[-1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,1,0,0,1,0,2,2,3,3,1,1,3,2,3,1,1,0,1,0,1,0,1,0,1,0,1,2,0,0,0,1,0,1,1,1,1,2,1,1,1,0,1,2,1,1,2,3,2,1,1,1,2,2,1,2,1,2,2,2,2,1,2,2,2,2,2,2,2,-1],[-1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,0,2,3,2,2,1,0,1,0,0,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,2,2,2,1,1,2,3,2,1,2,1,1,1,2,1,2,1,2,1,2,2,1,2,2,2,2,2,2,-1],[-1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,0,1,1,2,3,2,1,1,2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,2,2,2,-1],[-1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,3,1,0,2,2,2,3,1,2,1,2,1,2,1,2,1,2,1,2,2,1,2,2,2,2,2,2,-1],[-1,-1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,0,2,1,2,3,2,1,1,1,2,1,2,1,2,2,2,1,2,2,2,2,2,2,2,-1,-1],[-1,-1,1,1,2,1,0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,1,2,0,1,3,2,1,2,1,1,2,1,2,1,1,2,2,1,2,2,2,2,2,2,-1,-1],[-1,-1,1,1,2,2,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,2,2,1,1,3,3,1,1,2,2,1,2,1,2,2,1,2,2,2,1,2,2,2,2,-1,-1],[-1,-1,1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,2,3,2,0,2,1,3,2,1,2,1,1,2,1,2,2,2,2,2,2,2,2,2,2,2,-1,-1,-1],[-1,-1,-1,1,2,2,2,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,2,1,0,0,1,1,2,1,1,1,1,1,1,1,1,1,3,2,1,1,2,1,1,1,2,1,2,1,2,1,1,2,2,1,2,1,2,2,2,2,-1,-1,-1],[-1,-1,-1,-1,1,2,2,2,2,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,2,1,1,2,1,0,1,1,1,1,1,1,1,1,2,3,2,1,1,1,2,1,2,1,2,1,2,1,2,2,1,2,2,2,2,2,2,2,2,-1,-1,-1],[-1,-1,-1,1,2,1,0,3,2,1,1,1,1,1,0,1,1,1,0,0,1,0,1,1,1,1,0,1,1,0,0,1,0,1,0,1,0,1,1,1,1,0,0,2,1,0,1,1,1,1,1,2,1,1,2,1,2,0,1,1,2,2,1,1,2,1,2,1,2,2,1,2,2,2,1,2,2,2,3,3,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,2,2,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,2,0,1,1,2,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,2,1,2,1,2,1,2,2,1,2,1,2,2,2,3,2,2,-1,-1,-1,-1],[-1,-1,-1,-1,1,1,2,1,3,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,2,3,1,0,3,2,1,2,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,1,2,1,2,2,1,2,1,2,1,2,2,2,2,2,1,2,3,3,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,1,1,2,2,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,2,1,3,1,2,1,2,3,1,0,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1,2,1,2,2,1,2,1,2,2,1,2,2,2,3,2,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,1,1,0,2,1,1,1,1,1,1,1,1,1,1,1,0,1,1,2,2,2,1,2,2,1,3,2,1,0,1,1,1,1,1,1,1,1,1,1,0,1,2,1,1,2,1,1,2,1,1,1,1,2,1,1,2,1,2,1,2,1,1,2,2,2,1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,0,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,0,2,1,1,1,1,1,1,1,1,2,1,1,1,2,2,1,2,1,2,1,1,2,1,2,2,2,1,2,2,2,2,2,2,2,3,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,2,3,1,1,1,2,2,3,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,2,2,1,2,2,2,2,1,2,2,2,3,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,2,1,2,1,2,2,1,2,1,2,2,1,2,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,0,1,2,2,2,2,2,2,3,2,2,1,0,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,3,3,3,3,2,1,2,1,2,2,2,1,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,1,2,0,0,2,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,2,1,2,3,3,3,3,2,2,2,2,2,1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,2,1,1,2,1,1,2,1,1,1,1,3,2,1,2,1,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1,1,2,1,2,2,2,1,2,3,1,2,2,2,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,2,2,1,2,1,2,1,1,2,1,2,1,1,1,2,2,3,2,1,2,1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,2,1,1,2,1,2,1,2,2,2,1,2,3,1,2,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,2,1,2,1,1,2,2,1,2,1,2,1,2,1,2,2,2,2,2,2,2,2,1,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,1,1,2,1,1,1,1,1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1,1,2,1,2,1,1,2,1,2,1,1,2,1,2,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,1,1,2,1,2,1,1,1,1,2,1,1,1,0,1,1,1,2,1,1,2,1,2,1,1,2,1,1,2,1,1,1,2,1,2,1,2,1,2,2,1,2,1,2,1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,1,1,1,1,1,2,1,1,1,1,1,2,2,2,2,2,1,1,2,1,1,1,2,1,1,2,1,2,1,2,2,1,2,1,2,1,2,2,1,2,2,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,1,2,1,1,1,2,1,2,1,2,2,2,2,1,2,2,1,1,2,2,1,2,1,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,2,1,2,2,1,1,1,1,1,1,2,1,1,1,1,2,2,1,1,2,2,2,2,1,2,1,1,2,2,1,2,1,2,1,2,2,1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,2,1,1,2,2,1,2,1,2,2,2,1,2,1,1,2,2,2,1,1,2,1,2,1,2,2,1,2,1,2,1,2,2,1,2,2,2,3,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,2,1,2,2,1,2,2,2,2,2,2,2,2,3,1,1,2,1,2,2,1,2,1,2,2,2,2,2,2,2,2,2,2,3,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,2,1,1,2,1,2,2,2,2,2,2,2,2,2,2,1,2,1,2,2,1,2,2,1,2,2,2,2,2,2,3,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,2,1,1,1,2,1,1,2,1,1,2,1,2,1,2,1,2,2,1,2,2,2,1,2,1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,1,2,2,1,2,2,3,2,2,1,2,1,2,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]

    let m_x = 0;
    let m_y = 0;

    let m_width = pixels[0].length - 1;
    let m_height = pixels.length - 1;

    let m_px = -319;
    let m_py = 207;

    function m_next() {
        const m_c = pixels[m_y][m_x];
        if (m_c === -1) return m_adv();
        const m_pos = [m_x + m_px, m_y + m_py];
        if (isSameColorIn(store.getState(), m_pos, m_c)) return m_adv();
        console.log(`Placing color ${m_c} at ${m_pos.join(", ")}`);
        store.dispatch(tryPlacePixel(m_pos, toast, m_c));
        setTimeout(() => {
            let m_timeUntil = new Date(store.getState().user.wait).getTime() - Date.now();
            if (m_timeUntil) {
                setTimeout(m_adv, m_timeUntil);
            } else {
                m_adv()
            }
        }, 5000)
    }

    function m_adv() {
        if (m_x >= m_width) {
            m_x = 0;
            m_y++;
        } else {
            m_x++;
        }
        m_next()
    }

    let m_timeUntil = new Date(store.getState().user.wait).getTime() - Date.now();
    if(m_timeUntil) {
        setTimeout(m_next, m_timeUntil)
    } else {
        m_next()
    }
})();
