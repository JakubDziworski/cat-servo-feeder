var Lcd = require('lcd'),
    lcd = new Lcd({rs: 26, e: 19, data: [13, 6, 5, 11], cols: 8, rows: 1});

lcd.on('ready', function () {
    setInterval(function () {
        lcd.setCursor(0, 0);
        lcd.print(new Date().toISOString().substring(11, 19), function (err) {
            if (err) {
                throw err;
            }
        });
    }, 1000);
});

// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function () {
    lcd.close();
    process.exit();
});