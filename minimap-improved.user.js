// ==UserScript==
// @name         PixelCanvas Minimap Rewrite
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  PixelCanvas Minimap for all templates.
// @author       Levi_OP
// @match        *://pixelcanvas.io/*
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
/*globals GM_config*/

(function() {
    'use strict';

    const cssStyle = `
    #minimapbg {
        position: absolute;
        right: 1em;
        bottom: 1em;
    }

    #posyt {
        background-color: rgba(0, 0, 0, 0.75);
        color: rgb(250, 250, 250);
        text-align: center;
        line-height: 42px;
        vertical-align: middle;
        width: ato;
        height: auto;
        border-radius: 8px;
        padding: 6px;
    }

    #minimap-text {
        display: none;
    }

    #minimap-box {
        position: relative;
        width:420px;
        height:300px;
        margin: 3px;
    }

    #minimap, #minimap-board, #minimap-cursor {
        width: 100%;
        height: 100%;
        position:absolute;
        top:0;
        left:0;
    }

    #minimap {
        z-index:1;
    }

    #minimap-board {
        z-index:2;
    }

    #minimap-cursor {
        z-index:3;
    }

    #minimap-config {
        font-size: 14px;
        line-height:20px;
    }

    .map-clickable {
        cursor: pointer;
    }

    .map-zoom {
        font-weight:bold;
    }`;

    const htmlFragment = `
    <div id="minimapbg">
        <div class="posy" id="posyt">
            <div id="minimap-text"></div>
            <div id="minimap-box">
                <canvas id="minimap"></canvas>
                <canvas id="minimap-board"></canvas>
                <canvas id="minimap-cursor"></canvas>
            </div>
            <div id="minimap-config">
                <span class="map-clickable" id="hide-map">Hide Map</span>
                |
                <span class="map-clickable" id="follow-mouse">Follow Mouse</span>
                |
                <span class="map-clickable" id="config">Config</span>
                |
                <span class="map-clickable" id="toggle-grid">Toggle Grid</span>
                |
                Zoom:
                <span class="map-clickable map-zoom" id="zoom-plus">+</span>
                /
                <span class="map-clickable map-zoom" id="zoom-minus">-</span>
            </div>
        </div>
    </div>`;

    window.addEventListener('load', () => {
        // Remove annoying alerts
        setTimeout(() => {
            document.querySelector("[role=alert]")?.remove();
        }, 2000);

        // Regular Expression to get coordinates out of URL
        const re = /(.*)@(.*),(.*)/g;

        // Regular Expression to get coordinates from cursor
        const rec = /\((.*), (.*)\)/g;
        const gameWindow = document.getElementById("gameWindow");

        // DOM element of the displayed X, Y variables
        let coorDOM = Array.from(document.getElementById("app").children[0].children).filter(c => c?.children[0]?.innerText.includes(","))[0].children[0];
        
        // coordinates of the middle of the window
        let x_window = 0;
        let y_window = 0;

        // coordinates of cursor
        let x = 0;
        let y = 0;

        // list of all available templates
        let template_list = null;

        // toggle options
        if (!GM_getValue("options") || JSON.stringify(Object.keys(JSON.parse(GM_getValue("options")))) !== JSON.stringify(["show", "follow", "grid", "zoomlevel"])) {
            GM_setValue("options", JSON.stringify({
                show: true,
                follow: true,
                grid: true,
                zoomlevel: 9
            }));
        }
        let options = JSON.parse(GM_getValue("options"));
        let config = false;
        let zoom_state = 0;
        let zoom_time = 100;

        // array with all loaded template-images
        let image_list = [];
        let counter = 0;

        // templates which are needed in the current area
        let needed_templates = null;

        // Set style
        addGlobalStyle(cssStyle);

        // Add minimap
        let div = document.createElement('div');
        div.innerHTML = htmlFragment;
        document.body.appendChild(div);

        // Setup canvas
        const minimap = document.getElementById("minimap");
        const minimap_board = document.getElementById("minimap-board");
        const minimap_cursor = document.getElementById("minimap-cursor");
        minimap.width = minimap.offsetWidth;
        minimap_board.width = minimap_board.offsetWidth;
        minimap_cursor.width = minimap_cursor.offsetWidth;
        minimap.height = minimap.offsetHeight;
        minimap_board.height = minimap_board.offsetHeight;
        minimap_cursor.height = minimap_cursor.offsetHeight;
        const ctx_minimap = minimap.getContext("2d");
        const ctx_minimap_board = minimap_board.getContext("2d");
        const ctx_minimap_cursor = minimap_cursor.getContext("2d");

        // No Antialiasing when scaling!
        ctx_minimap.mozImageSmoothingEnabled = false;
        ctx_minimap.webkitImageSmoothingEnabled = false;
        ctx_minimap.msImageSmoothingEnabled = false;
        ctx_minimap.imageSmoothingEnabled = false;

        ctx_minimap_board.mozImageSmoothingEnabled = false;
        ctx_minimap_board.webkitImageSmoothingEnabled = false;
        ctx_minimap_board.msImageSmoothingEnabled = false;
        ctx_minimap_board.imageSmoothingEnabled = false;

        drawBoard();
        drawCursor();

        // Setup events
        document.getElementById("hide-map").onclick = () => {
            //console.log("This should do something, but it doesn't");
            options.show = false;
            GM_setValue("options", JSON.stringify(options));
            document.getElementById("minimap-box").style.display = "none";
            document.getElementById("minimap-config").style.display = "none";
            document.getElementById("minimap-text").style.display = "block";
            document.getElementById("minimap-text").innerHTML = "Show Minimap";
            document.getElementById("minimap-text").style.cursor = "pointer";
        };

        document.getElementById("minimap-text").onclick = () => {
            options.show = true;
            GM_setValue("options", JSON.stringify(options));
            document.getElementById("minimap-box").style.display = "block";
            document.getElementById("minimap-config").style.display = "block";
            document.getElementById("minimap-text").style.display = "none";
            document.getElementById("minimap-text").style.cursor = "default";
            loadTemplates();
        };

        document.getElementById("zoom-plus").addEventListener('mousedown', (e) => {
            if (e.which !== 1) return;
            e.preventDefault();
            zoom_state = +1;
            zoom();
        }, false);
        document.getElementById("zoom-minus").addEventListener('mousedown', (e) => {
            if (e.which !== 1) return;
            e.preventDefault();
            zoom_state = -1;
            zoom();
        }, false);

        document.getElementById("zoom-plus").addEventListener('mouseup', (e) => {
            if (e.which !== 1) return;
            zoom_state = 0; 
        }, false);
        document.getElementById("zoom-minus").addEventListener('mouseup', (e) => {
            if (e.which !== 1) return;
            zoom_state = 0;
        }, false);

        document.getElementById("follow-mouse").onclick = function() {
            options.follow = !options.follow;
            GM_setValue("options", JSON.stringify(options));
            if(options.follow) {
                this.innerHTML = "Follow Mouse";
                loadTemplates();
                x_window = x;
                y_window = y;
                drawCursor();
            } else {
                this.innerHTML = "Follow Window";
                getCenter();
            }
        };

        document.getElementById("toggle-grid").onclick = () => {
            options.grid = !options.grid;
            GM_setValue("options", JSON.stringify(options));
            drawBoard();
        };

        document.getElementById("config").onclick = () => {
            config = !config;
            config ? GM_config.open() : GM_config.close();
        };

        gameWindow.addEventListener('mouseup', () => {
            if(!options.show) return;
            if (e.which !== 1) return;
            if(!options.follow) setTimeout(getCenter, 100);
        }, false);

        gameWindow.addEventListener('mousemove', mouseMove, false);
        gameWindow.addEventListener('wheel', mouseMove, false);

        function mouseMove() {
            if(!options.show) return;
            const x_new = coorDOM.innerHTML.replace(rec, '$1');
            const y_new = coorDOM.innerHTML.replace(rec, '$2');
            if (x != x_new || y != y_new) {
                x = x_new;
                y = y_new;
                if(options.follow){
                    x_window = x;
                    y_window = y;
                } else {
                    drawCursor();
                }
                loadTemplates();
            }
        }
        // Setting up config
        GM_config.init({
            'id': 'minimap',
            'fields':
            {
                'templates':
                {
                    'label': 'Templates',
                    'type': 'textarea',
                    'default': '[\n{"url":"uk7uvv.png","height":360,"width":360,"x":3059,"y":-15374}\n]'
                }
            },
            'css': '.config_var { height: 80%; } textarea { width: 100%; height: 100%; font-family: monospace !important; }'
        });

        GM_config.onSave = update;

        update();

        function addGlobalStyle(css) {
            var head, style;
            head = document.getElementsByTagName('head')[0];
            if (!head) { return; }
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        }

        function update() {
            console.log("Updating Template List");
            template_list = JSON.parse(GM_config.get('templates'));
            if(!options.follow) getCenter();
        }

        function clampZoom(zoom) {
            return Math.min(45, Math.max(1,zoom));
        }

        function zoom() {
            if(!zoom_state) return;

            options.zoomlevel = clampZoom(options.zoomlevel * Math.pow(1.1, zoom_state));
            GM_setValue("options", JSON.stringify(options));

            drawBoard();
            drawCursor();
            loadTemplates();
            setTimeout(zoom, zoom_time);
        }


        function loadTemplates() {
            if(!options.show) return;
            if(template_list == null) return;

            const x_left   = x_window*1 - minimap.width  / options.zoomlevel / 2;
            const x_right  = x_window*1 + minimap.width  / options.zoomlevel / 2;
            const y_top    = y_window*1 - minimap.height / options.zoomlevel / 2;
            const y_bottom = y_window*1 + minimap.height / options.zoomlevel / 2;

            needed_templates = [];

            for(let i = 0; i < template_list.length; i++) {
                const temp_x  = template_list[i]["x"]*1;
                const temp_y  = template_list[i]["y"]*1;
                const temp_xr = template_list[i]["x"]*1 + template_list[i]["width"]*1;
                const temp_yb = template_list[i]["y"]*1 + template_list[i]["height"]*1;
                if ( temp_xr < x_left || temp_yb < y_top || temp_x >= x_right || temp_y >= y_bottom) continue;
                //console.log(" Template " + template_list[i]["url"] + " is in range!");
                needed_templates.push(template_list[i]);
            }

            if(needed_templates.length == 0) {
                if(zoom_state == false) {
                    ctx_minimap.clearRect(0,0,minimap.width,minimap.height);
                    //document.getElementById("minimap").style.display = "none";
                    //document.getElementById("minimap-text").style.display = "block";
                    //document.getElementById("minimap-text").innerHTML = "No Template in this area";
                }
            } else {
                document.getElementById("minimap").style.display = "block";
                //document.getElementById("minimap-text").style.display = "none";
                counter = 0;

                for(let i = 0; i < needed_templates.length; i++) {
                    if(image_list[needed_templates[i]["url"]] == null) {
                        loadImage(needed_templates[i]);
                    } else {
                        counter += 1;
                        //if last needed image loaded, start drawing
                        if (counter == needed_templates.length) drawTemplates();
                    }
                }
            }
        }

        async function loadImage(templatearray) {
            const imageurl = templatearray["url"];
            console.log("Load image " + imageurl);
            image_list[imageurl] = new Image();
            //image_list[imageurl].src = "https://zergmafia.top/" + imageurl;
            const data = await fetch(imageurl).then(r => r.blob()).then(b => new Promise((res, rej) => {
                const reader = new FileReader();
                reader.onloadend = () => res(reader.result);
                reader.onerror = rej;
                reader.readAsDataURL(b);
            }))
            image_list[imageurl].onload = () => {

                counter += 1;
                // if last needed image loaded, start drawing
                if (counter == needed_templates.length) drawTemplates();
            };
            image_list[imageurl].src = data;
        }

        function drawTemplates() {
            ctx_minimap.clearRect(0,0,minimap.width,minimap.height);
            const x_left = x_window*1 - minimap.width / options.zoomlevel / 2;
            const y_top = y_window*1 - minimap.height / options.zoomlevel / 2;
            for(let i = 0; i < needed_templates.length; i++) {
                const template = needed_templates[i];
                const url = template["url"];
                const xoff = (template["x"]*1 - x_left*1) * options.zoomlevel;
                const yoff = (template["y"]*1 - y_top*1) * options.zoomlevel;
                const newwidth = options.zoomlevel * image_list[url].width;
                const newheight = options.zoomlevel * image_list[url].height;
                const img = image_list[url];
                ctx_minimap.drawImage(img, xoff, yoff, newwidth, newheight);
            }
        }

        function drawBoard() {
            ctx_minimap_board.clearRect(0,0,minimap_board.width,minimap_board.height);

            if (options.zoomlevel <= 4.6 || !options.grid) return;

            ctx_minimap_board.beginPath();
            const bw = minimap_board.width + options.zoomlevel;
            const bh = minimap_board.height + options.zoomlevel;
            const xoff_m = (minimap.width / 2) % options.zoomlevel - options.zoomlevel;
            const yoff_m = (minimap.height / 2) % options.zoomlevel - options.zoomlevel;
            const z = options.zoomlevel;

            ctx_minimap_board.fillStyle = "rgba(0,0,0,0.75)";

            for (let x = 0; x <= bw; x += z) {
                ctx_minimap_board.fillRect(x + xoff_m, yoff_m, 1, bh);
            }

            for (let y = 0; y <= bh; y += z) {
                ctx_minimap_board.fillRect(xoff_m, y + yoff_m, bw, 1);
            }
        }

        function drawCursor() {
            const x_left = x_window*1 - minimap.width / options.zoomlevel / 2;
            const x_right = x_window*1 + minimap.width / options.zoomlevel / 2;
            const y_top = y_window*1 - minimap.height / options.zoomlevel / 2;
            const y_bottom = y_window*1 + minimap.height / options.zoomlevel / 2;
            ctx_minimap_cursor.clearRect(0,0,minimap_cursor.width,minimap_cursor.height);
            if( x < x_left || x > x_right || y < y_top || y > y_bottom) return;
            const xoff_c = x - x_left;
            const yoff_c = y - y_top;

            ctx_minimap_cursor.beginPath();
            ctx_minimap_cursor.lineWidth = Math.min(4, options.zoomlevel / 3);
            ctx_minimap_cursor.strokeStyle = "red";
            ctx_minimap_cursor.rect(options.zoomlevel * xoff_c, options.zoomlevel * yoff_c, options.zoomlevel, options.zoomlevel);
            ctx_minimap_cursor.stroke();
        }

        function getCenter() {
            const url = window.location.href;
            x_window = url.replace(re, '$2');
            y_window = url.replace(re, '$3');
            if(x_window == url || y_window == url) {
                x_window = 0;
                y_window = 0;
            }
            loadTemplates();
        }
    }, false);
})();
