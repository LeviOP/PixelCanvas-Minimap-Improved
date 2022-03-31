const Jimp = require('jimp');

Jimp.read("./wikipedia-logo-transparent.png", (err, image) => {
    if (err) throw err;
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    let pixels = [];
    for (y = 0; y < height; y++) {
        pixels[y] = [];
        for (x = 0; x < width; x++) {
            pixels[y].push(image.getPixelColor(x, y).toString(16));
        }
    }
    console.log(pixels[0][0])
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
    console.log(JSON.stringify(pcpixels, null, 0))
});
