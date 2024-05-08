const HOUR = 3600000;
const DAY = 86400000

function GET_MONTH_NAME_ENGLISH( month ){
    switch(month){
        case 1: {
            return "JAN"
        }
        case 2: {
            return "FEB"
        }
        case 3: {
            return "MAR"
        }
        case 4: {
            return "APR"
        }
        case 5: {
            return "MAY"
        }
        case 6: {
            return "JUN"
        }
        case 7: {
            return "JUL"
        }
        case 8: {
            return "AUG"
        }
        case 9: {
            return "SEP"
        }
        case 10: {
            return "OCT"
        }
        case 11: {
            return "NOV"
        }
        case 12: {
            return "DEC"
        }
    }
}

function GET_CURRENT_MONTH( date ){
    var currenMoth = new Date( `${ GET_MONTH_NAME_ENGLISH( date.getMonth() + 1 )} 01, ${ date.getFullYear() }` );
    return currenMoth;
}

// 28-SEP-2022 17:42:11.597
function GET_CURRENT_DATE_BD( days = 0, type = 'DATE' ){
    days = days * DAY;

    if( type === 'DATETIME' ){
        let time = new Date( new Date().getTime() + days );

        let day = time.getDate();
        let month = GET_MONTH_NAME_ENGLISH( time.getMonth() +1 );
        let year = time.getFullYear()

        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        let mil = time.getMilliseconds();

        return `${ day }-${ month }-${ year } ${ hour }:${ min }:${ sec }.${ mil }`;
    }
    let time = new Date( new Date().getTime() - ( 6 * HOUR ) + days );
    
    let day = time.getDate();
    let month = GET_MONTH_NAME_ENGLISH( time.getMonth() +1 );
    let year = time.getFullYear()

    return `${ day }-${ month }-${ year }`;
}

function DATE_TO_SAVE( time = null, type = "DATETIME" ){  
    if( time === null ){ time = new Date(new Date().getTime() - ( 6 * HOUR )); }
    if( typeof time === "string" ){ time = new Date( time ); }

    let year = time.getFullYear();
    let month = time.getMonth() +1;
    let day = time.getDate();

    if( month < 10 ) month = "0" +month
    if( day < 10 ) day = "0" +day

    if( type === "DATETIME" ){
        // 2023-01-09 13:27:14.573
        let hour = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let milliseconds = time.getMilliseconds();
    
        if( hour < 10 ) hour = "0" +hour
        if( minutes < 10 ) minutes = "0" +minutes
        if( seconds < 10 ) seconds = "0" +seconds
        if( milliseconds > 10 && milliseconds < 100  ) milliseconds = "0" +milliseconds
        if( milliseconds < 10 ) milliseconds = "00" +milliseconds
    
        return `${ year }-${ month }-${ day } ${ hour }:${ minutes }:${ seconds }.${ milliseconds }`;
    }

    return `${ year }-${ month }-${ day }`;
}

function GET_TIME( time = null, add = 0 ){
    if( time === null ){ time = new Date().getTime() + ( add * HOUR ); }
    else { time = new Date( time ).getTime() + ( add * HOUR ) }
    
    return time;
}

// DD-MM-YYYY
function MICROSIP_DATE( time = null, add = 0 ) {
    if( time === null ){ time = new Date( new Date().getTime() + ( add * HOUR ) ); }
    else{ time = new Date( new Date( time ).getTime() + ( add * HOUR )) }

    let year = time.getFullYear();
    let month = time.getMonth() +1;
    let day = time.getDate();

    if( month < 10 ) month = "0" +month
    if( day < 10 ) day = "0" +day

    return `${ day }.${ month }.${ year }`;
}

// YYYY-MM-DD
function SQLSERVER_DATE( time = null, add = 0 ) {
    if( time === null ){ time = new Date(new Date().getTime() + ( add * HOUR )); }
    else { time = new Date( new Date( time ).getTime() + ( add * HOUR )) }

    let year = time.getFullYear();
    let month = time.getMonth() +1;
    let day = time.getDate();

    if( month < 10 ) month = "0" +month
    if( day < 10 ) day = "0" +day

    return `${ year }-${ month }-${ day }`;
}

// MM-DD-YYYY
function GET_FIRST_LAST_DAY_WEEK( time = null, type = "FISRT" ){
    if( time == null ){ time = new Date(new Date().getTime() - ( 6 * HOUR )); }
    if( typeof time == "string" || typeof time == "number" ){ time = new Date( time ); }

    var first = time.getDate() - time.getDay();
    var last = first + 6;

    if( type === "LAST" ){
        return new Date(time.setDate(last));
    }
    return new Date(time.setDate(first));
}

function GET_WEEK( time = null ){
    if( time == null ){ time = new Date(new Date().getTime() - ( 6 * HOUR )); }
    if( typeof time == "string" || typeof time == "number" ){ time = new Date( time ); }
    
    var year = new Date( time.getFullYear(), 0, 1 );
    var days = Math.floor(( time - year ) / ( 24 * 60 * 60 * 1000 ));
    return Math.ceil(( time.getDay() + 1 + days ) / 7);
}

// 2023-02-01T06:00:00.000Z
function GET_TIME_TIMEZONE( time, timezone = "MX" ){
    if( time == null ){ time = new Date( new Date().getTime() - ( 6 * HOUR ) ); }
    if( typeof time == "string" || typeof time == "number" ){ 
        if( timezone === "MX" ) {
            time = new Date( new Date( time ).getTime() - ( 6 * HOUR ) );
        } else {
            time = new Date( time ); 
        }
    }

    let year = time.getFullYear();
    let month = time.getMonth() +1;
    let day = time.getDate();

    if( month < 10 ) month = "0" +month
    if( day < 10 ) day = "0" +day

    return `${ year }-${ month }-${ day }T06:00:00.000Z`;
}

function SLEEP(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = {
    GET_TIME,
    GET_CURRENT_MONTH,
    GET_MONTH_NAME_ENGLISH,
    GET_CURRENT_DATE_BD,
    DATE_TO_SAVE,
    MICROSIP_DATE,
    SQLSERVER_DATE,
    GET_FIRST_LAST_DAY_WEEK,
    GET_WEEK,
    GET_TIME_TIMEZONE,
    SLEEP
}   