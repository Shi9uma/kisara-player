# dev handbook

## webrtc

>   参看参考资料 2，Web Real-Time Communication，WebRTC

![mozilla](https://img2018.cnblogs.com/blog/27612/201908/27612-20190831135612273-714303056.png)

A 和 B 在通信前需要协商会话需求（Session Description Protocol，SDP），主要流程如下

-   A 通过 STUN 服务器（用于在 NAT 网络下找出，通信双方端点经 NAT 后对应的 IP 和 port），收集自己的网络信息
-   A 创建 Offer SDP，通过 Signal Channel（信令服务器）传给 B
-   B 做出回应生成 Answer SDP，通过 Signal Channel 给到 A
-   B 通过 STUN 收集自己的网络信息，通过 Signal Channel 给到 A

注：如果 A，B 之间无法建立点对点的 P2P 直连，将通过 TURN 服务器中转

### STUN

![STUN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols/webrtc-stun.png)

NAT 会话穿越应用程序（Session Traversal Utilities for NAT，STUN）是一种由 RFC 定义的网络协议，用于检测网络中是否存在 NAT 设备，并获取两个通信端点经 NAT 设备分配的 IP 和 port，然后在两个通信端点之间建立一条可穿越 NAT 的 P2P 连接，实现 P2P 通信，这一过程也被形象的称为"打洞"。

### TURN

![TURN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols/webrtc-turn.png)


有些路由器采用一种称为对称 NAT（Symmetric NAT） 的限制，这意味着路由器只会接受先前连接过的对等方的连接

NAT 周围的中继遍历（Traversal Using Relays around NAT，TURN）旨在通过与 TURN 服务器建立连接并通过该服务器中继所有信息来绕过对称 NAT 的限制。A 将与 TURN 服务器建立连接，并告诉所有对等方将数据包发送到 TURN 服务器，然后由 TURN 服务器转发给 A。这会带来一些服务器上的开销，只有在没有其他替代方案时才会使用。

## peerjs

peerjs 的核心对象 Peer，有几个常用方法：

-   peer.connect，创建点对点的连接
-   peer.call，向另一 peer 端发起音视频实时通信
-   peer.on，对各种事件的监控回调
-   peer.disconnect，断开连接
-   peer.reconnect，重新连接
-   peer.destroy，销毁对象

另外还有两个重要对象 DataConnection、MediaConnection，其中：

-   DataConnection，用于收发数据，对应于 webrtc 中的 DataChannel
-   MediaConnection，用于处理媒体流



## tampermonkey

>   解读 tampermonkey 官方开发手册

















## References

1.   [tampermonkey 开发文档](https://www.tampermonkey.net/documentation.php?locale=zh)
2.   [利用 peerjs 轻松玩转 webrtc](https://www.cnblogs.com/yjmyzz/p/peerjs-tutorial.html)
3.   [peerjs 开发文档](https://peerjs.com/)
4.   