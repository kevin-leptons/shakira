document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        app_entry();
    }
}

function app_entry() {
    display_playing();
}

function play_file(file) {
    http_get(`/play?path=${file}`, function(status, data) {
        display_playing();
    });
}

function http_get(rel_path, callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState != 4)
            return;

        callback(this.status, JSON.parse(this.response));
    }
    xhttp.open("GET", rel_path, true);
    xhttp.send();
}

function get_playing(callback) {
    http_get('/play/playing', callback);
}

function display_playing() {


    get_playing(function(status, data) {
        set_player_label(data.name);
    });
}

function stop_player() {
    http_get('/play/stop', function(status) {
        if (status !== 200)
            return;
        set_player_label(null);
    });
}

function set_player_label(text) {
    var label = document.getElementById('player-label');
    if (!label)
        return;

    if (!text)
        label.innerHTML = '--Nothing Playing--';
    else
        label.innerHTML = text
    label.setAttribute('title', text);
}
