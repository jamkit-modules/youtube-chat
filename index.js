var module = (function() {
    const webjs = require("webjs-helper");

    var _id = "", _dir_path = "", _handlers = [];
    var _video_id = "";
    var _web_loaded = false;

    function _on_web_loaded(data) {
        if (data["url"].startsWith("https://www.youtube.com/watch")) {
            webjs.import(_dir_path + "/youtube.js");
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

    function _get_object(id, handler) {
        const object = view.object(id);

        if (!object) {
            timeout(0.1, function() {
                _get_object(id, handler);
            });
        } else {
            handler(object);
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
            _get_object(id, function(object) {
                object.action("load", { 
                    "filename": dir_path + "/web.sbml",
                    "dir-path": dir_path,
                    "web-id": id, 
                    "web-prefix": web_prefix,
                    "video-id": video_id
                });
            });

            _id = id, _dir_path = dir_path;
            _video_id = video_id;

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
