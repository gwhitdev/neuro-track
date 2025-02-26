function detectUrl() {
    const href = window.location.href;
    return href.split('/')[2].split(':')[0];
}

function printDevLog(location,stringToLog,eventType) {
    console.log(
        `----- # DEV LOGGING # -----
        
        > ${location.toUpperCase()} 
        >> ${stringToLog}
        >>> ${eventType.toUpperCase()}
        
        `
    );
}

function logger (location, stringToLog, eventType){
    if (detectUrl() === 'localhost') printDevLog(...arguments);
}

export default logger;