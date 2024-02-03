# SyncTV

项目地址，[synctv-org/synctv](https://github.com/synctv-org/synctv.git)，[文档](https://synctv.wiki/)

## install

使用 docker-compose.yml 安装 synctv，参考文档如下

```yaml
version: '3'

services:
  synctv:
    image: 'synctvorg/synctv:latest'
    container_name: synctv
    restart: unless-stopped
    ports:
      - '8001:8080'	# host:container
    volumes:
      - /home/www/synctv/data:/root/.synctv
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
      - TZ=Asia/Shanghai

# sudo docker-compose -f /home/www/synctv/synctv.yml up -d
```

访问 `http://ip:8001` 即可访问页面；通过 docker 查看日志可以发现，其内置一个 root/root 的账号，使用其登录之，后续可以进行一系列配置，包括创建新的 root 账号，新建其他 guest 账号等；当然为了方便管理和注册，建议直接使用 QQ 的 OAuth2 调用直接登录
