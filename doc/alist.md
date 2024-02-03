# Alist

## install

使用 docker-compose 安装，参考文件如下

```yaml
version: '3'

services:
    alist:
        image: 'xhofe/alist:latest'
        container_name: alist
        volumes:
            - '/home/www/alist/data:/opt/alist/data'
        ports:
            - '5244:5244'
        environment:
            - PUID=0
            - PGID=0
            - UMASK=022
        restart: unless-stopped

# sudo docker-compose -f /home/www/alist/alist.yml up -d
```

成功启动后，访问 `http://ip:5244`，通过 docker 日志可以找到 `INFO[xxx] Successfully created the admin user and the initial password is: xxxxx`，则账号密码就是 admin/xxxxx，然后到用户中心修改管理员账号相应内容

## 挂载百度网盘

参考 [官方文档](https://alist-doc.nn.ci/docs/driver/baidu/)