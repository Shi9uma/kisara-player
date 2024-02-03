# kisara-chatroom

>   一直想要找到一个能够实现：创建房间、手动添加视频源、同步播放视频、在线聊天室、聊天内容以弹幕形式发送的项目，目前已经有十分成熟的 [synctv-org/synctv](https://github.com/synctv-org/synctv.git)，本项目将主要以参考 synctv 的工程逻辑为目标，使用 JavaScript 复刻一个以 tampermonkey 插件形式实现的，能够同步视频播放 + 在线聊天室的项目

-   peer-server，peer-client；
-   一个配套 frontend，网页内自带 webrtc 视频同步 + 聊天室，视频链接可以是手动装载，统一装载，外链统一
-   可以加上弹幕系统，在线上看番的时候可以装载，优先级是：本地已有、线上爬取、弹幕盒子
    -   弹幕 parser 获取：自动识别番名，从巴哈、哔哩哔哩等获取弹幕；
-   集成到 tampermonkey，可以在目标页面以悬浮窗的形式创建聊天室
