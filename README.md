# kisara-chatroom

## sth

I always wanted to find a solution to create a room, which can be used to manually add video sources, synchronize video playback, have an online chatroom, and send chat content in the form of danmaku.

Currently, there is a mature project [synctv-org/synctv](https://github.com/synctv-org/synctv.git). 

Now this project aims to reference the engineering logic of synctv, using JavaScript to replicate a tampermonkey plugin that achieves synchronized video playback and an online chatroom.

## plan

-   peer-server, peer-client;
-   A corresponding frontend, a web page with built-in webrtc video synchronization + chatroom. Video links can be manually loaded, loaded uniformly, or linked externally.
-   A danmaku system can be added, which can be loaded while watching online, with priorities being: locally available, crawled online, danmaku box.
    -   Danmaku parser acquisition: Automatically recognize the anime title, obtain danmaku from sources such as Bahamut, Bilibili, etc.;
-   Integrated with tampermonkey, it can create a chatroom on the target page in the form of a floating window.
