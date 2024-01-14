// ==UserScript==
// @name    kisara-chatroom
// @description  一种基于 peerjs + tampermonkey 实现 webrtc 同步视频播放 + 在线聊天室
// @author  shiguma

const { Peer } = require('peerjs')

// code
let peerId = 'test'

let peer1 = new Peer(peerId, {
    host: 'localhost',
    port: 9000,
    path: '/test'
})

let conn = Peer.connect('test')
conn.on('open', function () {
    conn.send('hi!')
})