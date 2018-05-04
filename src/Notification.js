function notify(message) {
    alert(message);
}

function log(message) {
    console.log(message);
}

function announce(message) {
    document.getElementsByTagName('body')[0].textContent = message;
}

export default {
    notify,
    log,
    announce
}