
//%
enum GamerBitPin {
    //% block="P6"
    P6 = <number>DAL.MICROBIT_ID_IO_P6,
    //% block="P7"
    P7 = <number>DAL.MICROBIT_ID_IO_P7,
    //% block="P8"
    P8 = <number>DAL.MICROBIT_ID_IO_P8,
    //% block="P9"
    P9 = <number>DAL.MICROBIT_ID_IO_P9,
    //% block="P10"
    P10 = <number>DAL.MICROBIT_ID_IO_P10
}

//%
enum GamerBitEvent {
    //% block="pressed"
    Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
    //% block="released"
    Up = DAL.MICROBIT_BUTTON_EVT_UP,
    //% block="click"
    Click = DAL.MICROBIT_BUTTON_EVT_CLICK,
}

//% weight=10 color=#DC143C icon="\uf108" block="LCD"
namespace LCD {

    const xMin = 0
    const xMax = 320
    const yMin = 0
    const yMax = 240
    const tick = 300

    let pixel_8k = 0x0f
    let pixel_32k = 0x0f

    let init = false
    let flag = false
    //    let OBLOQ_MQTT_CB: Action = null
    //    let _image1: Image = null
    //    let _image2: Image = null
    //    let _checkTouch = 0

    /**
     * The user defines the motor rotation direction.
     */
    export enum colorType {
        //% blockId="RED" block="RED"
        RED = 0,
        //% blockId="BLACK" block="BLACK"
        BLACK = 1,
        //% blockId="WHITE" block="WHITE"
        WHITE = 2,
        //% blockId="GREEN" block="GREEN"
        GREEN = 3,
        //% blockId="BLUE" block="BLUE"
        BLUE = 4,
        //% blockId="YELLOW" block="YELLOW"
        YELLOW = 5,
        //% blockId="GRAY" block="GRAY"
        GRAY = 6
    }

    /**
     * The user defines the motor rotation direction.
     */
    export enum colorFillType {
        //% blockId="RED" block="RED"
        RED = 0,
        //% blockId="REDFILL" block="RED FILL"
        REDFILL = 10,
        //% blockId="BLACK" block="BLACK"
        BLACK = 1,
        //% blockId="BLACKFILL" block="BLACK FILL"
        BLACKFILL = 11,
        //% blockId="WHITE" block="WHITE"
        WHITE = 2,
        //% blockId="WHITEFILL" block="WHITE FILL"
        WHITEFILL = 12,
        //% blockId="GREEN" block="GREEN"
        GREEN = 3,
        //% blockId="GREENFILL" block="GREEN FILL"
        GREENFILL = 13,
        //% blockId="BLUE" block="BLUE"
        BLUE = 4,
        //% blockId="BLUEFILL" block="BLUE FILL"
        BLUEFILL = 14,
        //% blockId="YELLOW" block="YELLOW"
        YELLOW = 5,
        //% blockId="YELLOWFILL" block="YELLOW FILL"
        YELLOWFILL = 15,
        //% blockId="GRAY" block="GRAY"
        GRAY = 6,
        //% blockId="GRAYFILL" block="GRAY FILL"
        GRAYFILL = 16
    }

    let bgColor = colorType.WHITE

    //% shim=LCD::pinInit
    function pinInit(): void {
        return;
    }

    /**
     * The user defines the motor rotation direction.
     */
    export enum imageType {
        //% blockId="BMP" block="bmp"
        BMP = 0
    }

    /**
     * The user defines the motor rotation direction.
     */
    export enum sizeType {
        //% blockId="GBK16" block="GBK16"
        GBK16 = 1,
        //% blockId="GBK24" block="GBK24"
        GBK24 = 0
    }

    export class Image {
        name: string;
        xStart: number
        yStart: number
        width: number
        height: number
        pixel: number

        /** 
         * Send all the changes to the image.
         
        //% blockId="dislayImage" block="Dislay image %image" blockGap=8
        //% weight=10
        //% parts="neopixel"
        dislayImage() {
            while (flag)
                flag = true
            if (this.xStart + this.width > xMax || this.yStart + this.height > yMax || this.xStart < xMin || this.yStart < yMin) {
                serial.writeLine("x from 0 to 320,y from 0 to 240")
                return
            }
            lcdinit()
            spiStart()
            writeHead()
            spiWrite8(10)
            spiWrite8(this.pixel)
            spiWrite16(this.xStart)
            spiWrite16(this.yStart)
            spiEnd()
            spiWiat()
            flag = false
        }
        */
        /** 
         * Send all the changes to the image.
         */
        //% blockId="showImage" block="Show image %image at x %xEnd y%yEnd"
        //% blockGap=8
        //% xEnd.min=0 xEnd.max=319
        //% yEnd.min=0 yEnd.max=239
        //% weight=20
        //% parts="neopixel"
        showImage(xEnd: number, yEnd: number) {
            while (flag)
                flag = true
            if (this.xStart + this.width > xMax || this.yStart + this.height > yMax || this.xStart < xMin || this.yStart < yMin || xEnd < xMin || yEnd < yMin || xEnd + this.width > xMax || yEnd + this.height > yMax) {
                serial.writeLine("x from 0 to 320,y from 0 to 240")
                return
            }
            let overlapping = 0
            let xStart1 = 0
            let yStart1 = 0
            let xEnd1 = 0
            let yEnd1 = 0
            let xStart2 = 0
            let yStart2 = 0
            let xEnd2 = 0
            let yEnd2 = 0
            if ((xEnd >= this.xStart + this.width || xEnd + this.width <= this.xStart) || (yEnd >= this.yStart + this.height || yEnd + this.height <= this.yStart)) {
                overlapping = 1
                xStart1 = this.xStart
                yStart1 = this.yStart
                xEnd1 = this.xStart + this.width
                yEnd1 = this.yStart + this.height
                xStart2 = 0
                yStart2 = 0
                xEnd2 = 0
                yEnd2 = 0
            }
            if (xEnd >= this.xStart && xEnd <= this.xStart + this.width && yEnd <= this.yStart + this.height && yEnd >= this.yStart) {
                xStart1 = this.xStart
                yStart1 = this.yStart
                xEnd1 = this.xStart + this.width
                yEnd1 = yEnd
                xStart2 = this.xStart
                yStart2 = this.yStart
                xEnd2 = xEnd
                yEnd2 = this.yStart + this.height
            }
            if (xEnd >= this.xStart && xEnd <= this.xStart + this.width && yEnd + this.height <= this.yStart + this.height && yEnd + this.height >= this.yStart) {
                xStart1 = this.xStart
                yStart1 = this.yStart
                xEnd1 = xEnd
                yEnd1 = this.yStart + this.height
                xStart2 = this.xStart
                yStart2 = yEnd + this.height
                xEnd2 = this.xStart + this.width
                yEnd2 = this.yStart + this.height
            }
            if (xEnd + this.width >= this.xStart && xEnd + this.width <= this.xStart + this.width && yEnd <= this.yStart + this.height && yEnd >= this.yStart) {
                xStart1 = this.xStart
                yStart1 = this.yStart
                xEnd1 = this.xStart + this.width
                yEnd1 = yEnd
                xStart2 = xEnd + this.width
                yStart2 = this.yStart
                xEnd2 = this.xStart + this.width
                yEnd2 = this.yStart + this.height
            }
            if (xEnd + this.width >= this.xStart && xEnd + this.width <= this.xStart + this.width && yEnd + this.height <= this.yStart + this.height && yEnd + this.height >= this.yStart) {
                xStart1 = this.xStart
                yStart1 = yEnd + this.height
                xEnd1 = this.xStart + this.width
                yEnd1 = this.yStart + this.height
                xStart2 = xEnd + this.width
                yStart2 = this.yStart
                xEnd2 = this.xStart + this.width
                yEnd2 = this.yStart + this.height
            }
            if ((xEnd == this.xStart) && (yEnd >= this.yStart - this.height && yEnd <= this.yStart + this.height)) {
                overlapping = 1
                if (yEnd < this.yStart) {
                    xStart1 = this.xStart
                    yStart1 = yEnd + this.height
                    xEnd1 = this.xStart + this.width
                    yEnd1 = this.yStart + this.height
                } else {
                    xStart1 = this.xStart
                    yStart1 = this.yStart
                    xEnd1 = this.xStart + this.width
                    yEnd1 = yEnd
                }
                xStart2 = 0
                yStart2 = 0
                xEnd2 = 0
                yEnd2 = 0
            }
            if ((yEnd == this.yStart) && (xEnd >= this.xStart - this.width && xEnd <= this.xStart + this.width)) {
                overlapping = 1
                if (xEnd > this.xStart) {
                    xStart1 = this.xStart
                    yStart1 = this.yStart
                    xEnd1 = xEnd
                    yEnd1 = this.yStart + this.height
                } else {
                    xStart1 = xEnd + this.width
                    yStart1 = this.yStart
                    xEnd1 = this.xStart + this.width
                    yEnd1 = this.yStart + this.height
                }
                xStart2 = 0
                yStart2 = 0
                xEnd2 = 0
                yEnd2 = 0
            }
            if (this.pixel > 29) {
                overlapping = 1
                xStart1 = 0
                yStart1 = 0
                xEnd1 = 0
                yEnd1 = 0
                xStart2 = 0
                yStart2 = 0
                xEnd2 = 0
                yEnd2 = 0
            }
            spiStart()
            writeHead()
            spiWrite8(11)
            spiWrite8(overlapping)
            spiWrite16(xStart1)
            spiWrite16(yStart1)
            spiWrite16(xEnd1)
            spiWrite16(yEnd1)
            spiWrite8(bgColor)
            spiWrite16(xStart2)
            spiWrite16(yStart2)
            spiWrite16(xEnd2)
            spiWrite16(yEnd2)
            spiWrite8(this.pixel)
            spiWrite16(xEnd)
            spiWrite16(yEnd)
            spiWrite16(this.width)
            spiWrite16(this.height)
            spiWrite16(this.xStart)
            spiWrite16(this.yStart)
            spiEnd()
            spiWiat()
            this.xStart = xEnd
            this.yStart = yEnd
            flag = false
        }

        /** 
         * Send all the changes to the image.
         */
        //% blockId="freeImage" block="release image handle %image"
        //% blockGap=8
        //% weight=10
        //% parts="neopixel"
        freeImage() {
            while (flag)
                flag = true
            this.name = ''
            this.xStart = 0
            this.yStart = 0
            this.width = 0
            this.height = 0
            spiStart()
            writeHead()
            spiWrite8(12)
            spiWrite8(this.pixel)
            spiEnd()
            spiWiat()
            if (this.pixel == 1) {
                pixel_8k |= 0x1
                this.pixel = 0
            } else if (this.pixel == 2) {
                pixel_8k |= 0x2
                this.pixel = 0
            } else if (this.pixel == 3) {
                pixel_8k |= 0x4
                this.pixel = 0
            } else if (this.pixel == 4) {
                pixel_8k |= 0x8
                this.pixel = 0
            } else if (this.pixel == 5) {
                pixel_32k |= 0x1
                this.pixel = 0
            } else if (this.pixel == 6) {
                pixel_32k |= 0x2
                this.pixel = 0
            } else if (this.pixel == 7) {
                pixel_32k |= 0x4
                this.pixel = 0
            } else if (this.pixel == 8) {
                pixel_32k |= 0x8
                this.pixel = 0
            }
            flag = false
        }

        /** 
         * Send all the changes to the image.
         */
        //% blockId="hideImage" block="Hide image %image"
        //% blockGap=8
        //% weight=15
        //% parts="neopixel"
        hideImage() {
            while (flag)
                flag = true
            lcdinit()
            spiStart()
            writeHead()
            spiWrite8(0x05)
            spiWrite8(this.pixel)
            spiWrite16(this.xStart)
            spiWrite16(this.xStart + this.width)
            spiWrite16(this.yStart)
            spiWrite16(this.yStart + this.height)
            spiWrite8(bgColor)
            spiWrite8(1)
            spiEnd()
            spiWiat()
            flag = false
        }
    }

    function lcdinit() {
        if (init) {
            return
        }
        basic.pause(3000)
        init = true
    }

    function spiStart() {
        pins.digitalWritePin(DigitalPin.P16, 0)
    }

    function spiEnd() {
        pins.digitalWritePin(DigitalPin.P16, 1)
    }

    function writeHead() {
        pins.spiWrite(0x55)
        pins.spiWrite(0xAA)
    }

    function spiWrite8(data: number) {
        pins.spiWrite(data)
    }

    function spiWrite16(data: number) {
        pins.spiWrite((data >> 8) & 0xff)
        pins.spiWrite(data & 0xff)
    }

    function spiWiat() {
        while (pins.digitalReadPin(DigitalPin.P14) == 0) {
            let i = 0
        }
        basic.pause(tick)
    }

    //% blockId="clearScreen"
    //% blockGap=10
    //% block="Set background color to %color"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    export function clearScreen(color: colorType) {
        bgColor = color
        while (flag)
            flag = true
        lcdinit()
        spiStart()
        writeHead()
        spiWrite8(0x07)
        spiWrite8(0x01)
        spiWrite8(color)
        spiEnd()
        spiWiat()
        flag = false
        basic.pause(100)
    }

    //% blockId="displayCharacter"
    //% blockGap=10
    //% x.min=0 x.max=319
    //% y.min=0 y.max=239
    //% block="Display character %character color %colorType x starting position %x y starting position %y size %sizeType"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    export function displayCharacter(character: string, color: colorType, x: number, y: number, size: sizeType) {
        while (flag)
            flag = true
        if (x > xMax || y > yMax || x < xMin || y < yMin) {
            serial.writeLine("x from 0 to 320,y from 0 to 240")
            return
        }
        lcdinit()
        spiStart()
        writeHead()
        spiWrite8(0x02)
        spiWrite8(character.length)
        spiWrite8(0xff)
        for (let index = 0; index < character.length; index++) {
            spiWrite8(character.charCodeAt(index))
        }
        spiWrite8(0xff)
        spiWrite16(x)
        spiWrite16(y)
        spiWrite8(color)
        spiWrite8(bgColor)
        spiWrite8(size)
        spiEnd()
        spiWiat()
        flag = false
        basic.pause(100)
    }

    //% blockId="drawLine"
    //% blockGap=10
    //% xs.min=0 xs.max=319
    //% ys.min=0 ys.max=239
    //% xe.min=0 xe.max=319
    //% ye.min=0 ye.max=239
    //% block="Drawline | color %colorType x starting position %xs y starting position %ys x ending position %xe y ending position %ye"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    export function drawLine(color: colorType, xs: number, ys: number, xe: number, ye: number) {
        while (flag)
            flag = true
        if (xs > xMax || xe > xMax || ys > yMax || ye > yMax || xs < xMin || xe < xMin || ys < yMin || ye < yMin) {
            serial.writeLine("x from 0 to 320,y from 0 to 240")
            return
        }
        lcdinit()
        spiStart()
        writeHead()
        spiWrite8(0x04)
        spiWrite8(9)
        spiWrite16(xs)
        spiWrite16(xe)
        spiWrite16(ys)
        spiWrite16(ye)
        spiWrite8(color)
        spiEnd()
        spiWiat()
        flag = false
        basic.pause(100)
    }

    //% blockId="drawCircle"
    //% blockGap=10
    //% x.min=0 x.max=319
    //% y.min=0 y.max=239
    //% block="Draw circle | radius %radius color %color center coordinates x %x center coordinates y %y"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    //% blockSetVariable=Circle
    export function drawCircle(radius: number, color: colorFillType, x: number, y: number) {
        while (flag)
            flag = true
        let circle = new Image()
        if (x > xMax || y > yMax || x < xMin || y < yMin) {
            serial.writeLine("x from 0 to 320,y from 0 to 240")
            return null
        }
        circle.xStart = x
        circle.yStart = y
        circle.width = radius
        circle.height = radius
        lcdinit()
        spiStart()
        writeHead()
        spiWrite8(0x06)
        spiWrite8(7)
        spiWrite16(x)
        spiWrite16(y)
        if (color > 6) {
            spiWrite8(color - 10)
            circle.pixel = 20 + color
        } else {
            spiWrite8(color)
            circle.pixel = 40 + color
        }
        spiWrite8(radius)
        if (color > 6) {
            spiWrite8(1)
        } else {
            spiWrite8(0)
        }
        spiEnd()
        spiWiat()
        flag = false
        basic.pause(100)
        return circle
    }

    //% blockId="drawRectangle"
    //% blockGap=10
    //% xs.min=0 xs.max=319
    //% ys.min=0 ys.max=239
    //% xe.min=0 xe.max=319
    //% ye.min=0 ye.max=239
    //% block="Draw rectangle | color %color x starting position %xs y starting position %ys x ending position %xe y ending position %ye"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    //% blockSetVariable=Rectangle
    export function drawRectangle(color: colorFillType, xs: number, ys: number, xe: number, ye: number) {
        while (flag)
            flag = true
        let rectangle = new Image()
        if (xs > xMax || xe > xMax || ys > yMax || ye > yMax || xs < xMin || xe < xMin || ys < yMin || ye < yMin) {
            serial.writeLine("x from 0 to 320,y from 0 to 240")
            return null
        }
        rectangle.xStart = xs
        rectangle.yStart = ys
        rectangle.width = xe - xs
        rectangle.height = ye - ys
        lcdinit()
        spiStart()
        writeHead()
        spiWrite8(0x05)
        spiWrite8(10)
        spiWrite16(xs)
        spiWrite16(xe)
        spiWrite16(ys)
        spiWrite16(ye)
        if (color > 6) {
            spiWrite8(color - 10)
            spiWrite8(1)
            rectangle.pixel = color
        } else {
            spiWrite8(color)
            spiWrite8(0)
            rectangle.pixel = 20 + color
        }
        spiEnd()
        spiWiat()
        flag = false
        basic.pause(100)
        return rectangle
    }

    //% blockId="drawPoint"
    //% blockGap=10
    //% x.min=0 x.max=319
    //% y.min=0 y.max=239
    //% block="Draw point | color %colorType | x-coordinate %x | y-coordinate %y"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    export function drawPoint(color: colorType, x: number, y: number) {
        while (flag)
            flag = true
        if (x > xMax || y > yMax || x < xMin || y < yMin) {
            serial.writeLine("x from 0 to 320,y from 0 to 240")
            return
        }
        lcdinit()
        spiStart()
        writeHead()
        spiWrite8(0x03)
        spiWrite8(5)
        spiWrite16(x)
        spiWrite16(y)
        spiWrite8(color)
        spiEnd()
        spiWiat()
        flag = false
        basic.pause(100)
    }

    //% blockId="importImageName"
    //% blockGap=10
    //% width.min=0 width.max=320
    //% height.min=0 height.max=240
    //% block="Import image | name: %name format %format width %width height %height"
    //% color.fieldEditor="gridpicker" color.fieldOptions.column
    //% blockSetVariable=image
    export function importImageName(name: string, format: imageType, width: number, height: number): Image {
        while (flag)
            flag = true
        let image = new Image()
        let f = ""
        switch (format) {
            case imageType.BMP: f = ".bmp"; break;
            default: f = ".bmp"; break;
        }
        image.name = name + f
        let x = 0
        let y = 0
        image.xStart = 0
        image.yStart = 0
        image.width = width
        image.height = height
        if (x + width > 320 || y + height > 240 || x < 0 || y < 0 || width < 0 || height < 0 || width > 128 || height > 128) {
            serial.writeLine("x and width from 0 to 128,y and height from 0 to 128")
            return null
        }
        if (width * height > 64 * 64) {
            if (pixel_32k == 0) {
                serial.writeLine("Not enough space for 64X64 to 128X128")
                return null
            }
            if (pixel_32k & 0x1) {
                image.pixel = 5
                pixel_32k &= 0xe
            } else if (pixel_32k & 0x2) {
                image.pixel = 6
                pixel_32k &= 0xd
            } else if (pixel_32k & 0x4) {
                image.pixel = 7
                pixel_32k &= 0xb
            } else if (pixel_32k & 0x8) {
                image.pixel = 8
                pixel_32k &= 0x7
            }
        } else {
            if (pixel_8k == 0) {
                serial.writeLine("Not enough space for 1X1 to 64X64")
                return null
            }
            if (pixel_8k & 0x1) {
                image.pixel = 1
                pixel_8k &= 0xe
            } else if (pixel_8k & 0x2) {
                image.pixel = 2
                pixel_8k &= 0xd
            } else if (pixel_8k & 0x4) {
                image.pixel = 3
                pixel_8k &= 0xb
            } else if (pixel_8k & 0x8) {
                image.pixel = 4
                pixel_8k &= 0x7
            }
        }
        lcdinit()
        spiStart()
        writeHead()
        spiWrite8(0x09)
        spiWrite8(image.name.length)
        spiWrite8(0xff)
        for (let index = 0; index < image.name.length; index++) {
            spiWrite8(image.name.charCodeAt(index))
        }
        spiWrite8(0xff)
        spiWrite16(x)
        spiWrite16(y)
        spiWrite16(width)
        spiWrite16(height)
        spiWrite8(image.pixel)
        spiEnd()
        spiWiat()
        flag = false
        return image
        basic.pause(100)
    }

    /*
        ///////////////////////////////////补充////////////////////////////////
        //% blockId="setBrightness"
        //% blockGap=10
        //% value.min=0 value.max=255
        //% block="Set the brightness to %value"
        export function setBrightness(value: number) {
            if (value > 255 || value < 0) {
                serial.writeLine("value from 0 to 255")
                return
            }
            lcdinit()
            spiStart()
            writeHead()
            spiWrite8(0x01)
            spiWrite8(value)
            spiEnd()
            spiWiat()
        }
    */
    //% blockId="touch"
    //% blockGap=10
    //% block="Determine if image 1 %image1 and image 2 %image2 overlap"
    export function touch(image1: Image, image2: Image): number {
        if (!image1 || !image2) return 0
        while (flag)
            flag = true
        if ((image1.pixel < 29) && (image2.pixel < 29)) {
            if ((image2.xStart > image1.xStart - image2.width && image2.xStart < image1.xStart + image1.width) && (image2.yStart > image1.yStart - image2.height && image2.yStart < image1.yStart + image1.height)) {
                flag = false
                return 1
            } else {
                flag = false
                return 0
            }
        } else if ((image1.pixel > 29) && (image2.pixel < 29)) {
            if ((image1.xStart > image2.xStart - image1.width && image1.xStart < image2.xStart + image2.width + image1.width) && (image1.yStart > image2.yStart - image1.width && image1.yStart < image2.yStart + image2.height + image1.width)) {
                flag = false
                return 1
            } else {
                flag = false
                return 0
            }
        } else if ((image1.pixel < 29) && (image2.pixel > 29)) {
            if ((image2.xStart > image1.xStart - image2.width && image2.xStart < image1.xStart + image1.width + image2.width) && (image2.yStart > image1.yStart - image2.width && image2.yStart < image1.yStart + image1.height + image2.width)) {
                flag = false
                return 1
            } else {
                flag = false
                return 0
            }
        } else if ((image1.pixel > 29) && (image2.pixel > 29)) {
            if ((Math.pow((image1.xStart - image2.xStart), 2) + Math.pow((image1.yStart - image2.yStart), 2)) < Math.pow((image1.width + image2.width), 2)) {
                flag = false
                return 1
            } else {
                flag = false
                return 0
            }
        }
        return 0
    }

    //% blockId="directDislayImage"
    //% blockGap=10
    //% xStart.min=0 xStart.max=319
    //% yStart.min=0 yStart.max=239
    //% width.min=0 width.max=320
    //% height.min=0 height.max=240
    //% block="Display image | name %name x starting position %xStart y starting position %yStart width %width height %height" 
    export function directDislayImage(name: string, xStart: number, yStart: number, width: number, height: number) {
        while (flag)
            flag = true
        if (xStart > 320 || width > 320 || yStart > 240 || height > 240 || xStart < 0 || width < 0 || yStart < 0 || height < 0) {
            serial.writeLine("x from 0 to 320,y from 0 to 240")
            return
        }
        spiStart()
        writeHead()
        spiWrite8(0x08)
        spiWrite8(name.length)
        spiWrite8(0xff)
        for (let index = 0; index < name.length; index++) {
            spiWrite8(name.charCodeAt(index))
        }
        spiWrite8(0xff)
        spiWrite16(xStart)
        spiWrite16(yStart)
        spiWrite16(width)
        spiWrite16(height)
        spiEnd()
        spiWiat()
        flag = false
        basic.pause(100)
    }
    //% blockId="begin"
    //% blockGap=10
    //% weight=90
    //% block="begin"
    export function begin() {
        spiStart()
        writeHead()
        spiWrite8(0x01)
        spiEnd()
        spiWiat()
        directDislayImage("1：", 0, 0, 320, 240)
        spiStart()
        writeHead()
        spiWrite8(0x01)
        spiEnd()
        spiWiat()
    }

    /**
     * Registers code to run when a DFRobot gamer:bit event is detected.
     */
    //% weight=60
    //% blockGap=50
    //% blockId=gamePad_onEvent block="on pin |%button press"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    export function onEvent(button: GamerBitPin, handler: Action) {
        pinInit()
        control.onEvent(<number>button, <number>GamerBitEvent.Down, handler); // register handler
    }

    /**
     * Registers code to run on various melody events
     */
    /*  
       //% blockId=onEventaa block="image1 %image1 | image2 %image2"
       //% help=music/on-event weight=59 blockGap=32
       export function onEventaa(image1: Image, image2: Image, handler: () => void) {
           OBLOQ_MQTT_CB = handler
           _image1 = image1
           _image2 = image2
           _checkTouch = 1
       }
   
       basic.forever(function () {
           if (_checkTouch && LCD.touch(_image1, _image2)) {
               OBLOQ_MQTT_CB()
           }
       })
   */

}
