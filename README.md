# kisara-player

> 在线一起看平台，支持弹幕、在线聊天室
>
> 在线添加播放源，直播源等

## livego

采用 docker-compose 来部署 livego_docker，该项目源码 [点此](https://github.com/gwuhaolin/livego)，

在 docker-compose 中可以自定义端口映射，其中主要是 **7001(FLV拉流)**，**1935(直播推流)**，**8090(获取直播key)** 三个端口

**使用方法**

1.   打开 livego 服务：在 livego 文件夹下客制化配置完 docker-compose.yml 后执行 `sudo docker-compose -f docker-compose.yml up -d`，这里注意要保证相应的端口能访问得通。

2.   获取推流key：访问 `http://localhost:8090/control/get/room={diy}`，这里的 **{diy}** 改成任意你想要的名字，网页返回回来的一长串 channelkey 把他记录下来。

3.   通过 rtmp 推流：这里有一个最简单的方法就是使用 **obs-studio**，在 设置-推流 中填写相应内容。

     **服务** 选择 **自定义...**

     **服务器** 输入 `rtmp://localhost:1935/live/`，这里的 localhost 根据客制化内容来写

     **串流密钥** 就是刚才的 channelkey

     填写完就能正常推流了，可以访问 `rtmp://localhost:1935/{diy}` 来查看是否有推流的内容
