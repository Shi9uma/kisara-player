
/**
 * 创建一个 PeerServer 实例并启动服务器。
 * @module server
 */
const { PeerServer } = require('peer');

/**
 * PeerServer 实例。
 * @type {PeerServer}
 */
const peerServer = PeerServer({ port: 9000, path: '/test' });