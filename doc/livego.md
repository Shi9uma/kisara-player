# livego

## install

使用 livego_docker 来直播推流，[项目 repo](https://github.com/gwuhaolin/livego)，以下是 docker-compose 示例

```yaml
version: "3"
services:
  livego:
    image: gwuhaolin/livego:latest
    container_name: livego
    ports:
      - 7001:7001
      - 7002:7002
      - 1935:1935
      - 8090:8090
    restart: always
```

在 docker-compose 中可以自定义端口映射，其中主要是

-   7001，用于 flv 拉流，也是最常用的直播流播放目标
-   1935，直播推流
-   8090，获取鉴权 key

## usage

1.   打开 livego 服务：客制化配置完 **docker-compose.yml** 后执行 `sudo docker-compose -f docker-compose.yml up -d`，这里注意要保证相应的端口能访问得通

2.   获取推流 key：访问 `http://localhost:8090/control/get/room={diy}`，这里的 **{diy}** 改成任意想要的名字，网页返回一长串 `channelkey`

3.   通过 rtmp 推流：这里有一个最简单的方法就是使用 obs-studio，在 **设置 - 推流** 中填写相应内容，主要是参考上文对应端口的作用

     -   **服务** 选择 **自定义...**
     -   **服务器** 输入 `rtmp://localhost:1935/live/`，这里的 **串流密钥** 就是刚才的 channelkey

填写完就能正常直播推流，访问 `rtmp://localhost:1935/{diy}` 来查看是否有推流的内容