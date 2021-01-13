function removePlayer(onResult, onError) {
    _removePlayer(onResult, onError);
}

function _removePlayer(onResult, onError) {
    try {
        while (document.getElementById('player')) {
            document.getElementById('player').remove();
        }
    } catch (e) {
        setTimeout(function() {
            _removePlayer(onResult, onError);
        }, 100);
    }
}

function getLiveChatUrl(onResult, onError) {
    _getLiveChatUrl(onResult, onError);
}

function _getLiveChatUrl(onResult, onError) {
    try {
        var url = document.getElementById('chatframe').src;

        onResult({
            "url": url
        });
    } catch (e) {
        setTimeout(function() {
            _getLiveChatUrl(lastMessageId, onResult, onError);
        }, 100);
    }
}
