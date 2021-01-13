function getChatMessages(lastMessageId, onResult, onError) {
    _getChatMessages(lastMessageId, onResult, onError);
}

function _getChatMessages(lastMessageId, onResult, onError) {
    try {
        var messageTags = document.getElementsByTagName('yt-live-chat-text-message-renderer');
        var messages = [];

        for (var i = messageTags.length; i > 0; --i) {
            var messageTag = messageTags[i - 1];
            var author = messageTag.getElementsByTagName('yt-live-chat-author-chip')[0].textContent
            var message = messageTag.querySelector('#message').textContent;

            if (messageTag.id === lastMessageId) {
                break;
            }

            messages.push({
                "id": messageTag.id,
                "author": author,
                "message": message
            });
        }

        onResult({
            "messages": messages.reverse()
        });
    } catch (e) {
        setTimeout(function() {
            _getChatMessages(lastMessageId, onResult, onError);
        }, 100);
    }
}
