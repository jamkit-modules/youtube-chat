var module = (function() {
    const webjs = require("webjs-helper");

    var _id = "", _video_id = "", _handlers = [];
    var _dir_path = "";
    var _web_loaded = false;

    function _on_web_loaded(data) {
        if (data["url"].startsWith("https://www.youtube.com/watch")) {
            webjs.import(_dir_path + "/youtube.js");
            webjs.call("removePlayer");
            webjs.call("getLiveChatUrl")
                .then(function(result) {
                    view.object(_id + ".web").property({
                        "url": result["url"]
                    });
                });

            return;
        }

        if (data["url"].startsWith("https://www.youtube.com/live_chat")) {
            webjs.import(_dir_path + "/livechat.js");
            
            _handlers.forEach(function(handler) {
                handler();
            });

            _web_loaded = true, _handlers = [];

            return;
        }

    }

    return {
        initialize: function(id, video_id) {
            var web_prefix = id.replace(".", "_");
            var dir_path = this.__ENV__["dir-path"];

            global[web_prefix + "__on_web_loaded"] = function(data) {
                _on_web_loaded(data);
            }

            webjs.initialize(id + ".web", "__$_bridge");
            view.object(id).action("load", { 
                "filename":dir_path + "/web.sbml",
                "web-id":id, 
                "web-prefix":web_prefix,
                "video-id":video_id
            });

            _id = id, _video_id = video_id, _dir_path = dir_path;

            return this;
        },

        get_chat_messages: function(last_message_id) {
            return new Promise(function(resolve, reject) {
                var handler = function() {
                    webjs.call("getChatMessages", [ last_message_id ])
                        .then(function(result) {
                            resolve(result);
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                }

                _web_loaded ? handler() : _handlers.push(handler);
            });
        },
    }
})();

__MODULE__ = module;
