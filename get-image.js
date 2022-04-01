// ==UserScript==
// @name         test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://example.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=example.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const m_image = new Image();
    fetch("https://media.discordapp.net/attachments/675154096423960599/959266055803519107/wikipedia-logo-transparent.png").then(r => r.blob()).then(b => new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onloadend = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(b);
    })).then(d => {
        m_image.src = d;
        const m_canvas = document.createElement("canvas");
        //document.body.appendChild(m_canvas);
        const width = m_image.width;
        const height = m_image.height;
        m_canvas.width = width;
        m_canvas.height = height;
        const ctx = m_canvas.getContext('2d');
        ctx.drawImage(m_image, 0, 0);
        const data = Array.from(ctx.getImageData(0, 0, 84, 77).data);
        let m_pixels = [];
        for (let x = 0; x < height; x++) {
            m_pixels[x] = [];
            for (let y = 0; y < width * 4; y++) {
                const ry = Math.floor(y / 4);
                if (!m_pixels[x][ry]) m_pixels[x][ry] = "";
                const p = data[x * width * 4 + y].toString(16);
                m_pixels[x][ry] += p.length === 1 ? "0" + p : p;
            }
        }
        const pccolors = [
            'ffffffff',
            'e4e4e4ff',
            '888888ff',
            '222222ff',
            'ffa7d1ff',
            'e50000ff',
            'e59500ff',
            'a06a42ff',
            'e5d900ff',
            '94e044ff',
            '02be01ff',
            '00d3ddff',
            '0083c7ff',
            '0000eaff',
            'cf6ee4ff',
            '820080ff'
        ]
        pcpixels = pixels.map(l => l.map(p => pccolors.indexOf(p)))
        console.log(m_pixels);
    });
})();
