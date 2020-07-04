export class ColorConverter {
    static colorToHex(color: string) {
        // Convert any CSS color to a hex representation
        // Examples:
        // colorToHex('red')            # '#ff0000'
        // colorToHex('rgb(255, 0, 0)') # '#ff0000'
        var rgba, hex;
        rgba = ColorConverter.colorToRGBA(color);
        hex = [0,1,2].map(
            function(idx) { return ColorConverter.byteToHex(rgba[idx]); }
            ).join('');
        return "#"+hex;
    }

    static colorToRGBA(color: string) {
        // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
        // color must be a valid canvas fillStyle. This will cover most anything
        // you'd want to use.
        // Examples:
        // colorToRGBA('red')  # [255, 0, 0, 255]
        // colorToRGBA('#f00') # [255, 0, 0, 255]
        var cvs, ctx;
        cvs = document.createElement('canvas');
        cvs.height = 1;
        cvs.width = 1;
        ctx = cvs.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
    }

    private static byteToHex(num: Number) {
        // Turns a number (0-255) into a 2-character hex number (00-ff)
        return ('0'+num.toString(16)).slice(-2);
    }
}