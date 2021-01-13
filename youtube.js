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
            _getLiveChatUrl(onResult, onError);
        }, 100);
    }
}
