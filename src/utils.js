import Peer from 'peerjs';

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genRandomUserName() {
  const adj = [
    'Guilty',
    'Rotten',
    'Supercool',
    'Bearded',
    'Filthy',
    'Stubborn',
  ];
  const nouns = [
    'Spark',
    'Apple',
    'Potato',
    'Dragon',
    'Kitty',
    'Brethren',
    'Fungus',
  ];

  const randAdj = adj[Math.floor(Math.random() * adj.length)];
  const randNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return randAdj + randNoun;
}

export class Logger {
  constructor(tagName) {
    this.logTagStyle = `
      padding: 2px; 
      color: whitesmoke; 
      background: #2c3e50; 
      border-top-left-radius: 4px; 
      border-bottom-left-radius: 4px; 
      font-weight:700;
    `;
    this.tagName = tagName;
  }

  print(msg, style) {
    console.log(`%c ${this.tagName} %c ${msg}`, this.logTagStyle, style);
  }

  log(msg) {
    this.print(
      msg,
      'padding: 2px; color: whitesmoke; background: #16a085; border-top-right-radius: 4px; border-bottom-right-radius:4px',
    );
  }

  warn(msg) {
    this.print(
      msg,
      'padding: 2px; color: #2c3e50; background: #f39c12; border-top-right-radius: 4px; border-bottom-right-radius:4px',
    );
  }
}

export async function getPeer() {
  const networkConsole = new Logger('💃🕺 PeerJS Logs');
  return new Promise((resolve, reject) => {
    const customPeerServer = {
      host: '9000-d100f37d-40e3-43ac-bb7d-308e33de2290.ws-us02.gitpod.io',
      path: '/',
      secure: true,
    };

    const peerjs = new Peer(customPeerServer)
      .on('open', (id) => resolve({ peerjs, id }))
      .on('error', () => {
        networkConsole.warn(
          'Custom PeerJS server unavailable, falling back to cloud server',
        );
        // Fallback to cloud server
        const cloudpeerjs = new Peer({})
          .on('open', (id) => resolve({ peerjs: cloudpeerjs, id }))
          .on('error', (err) => {
            console.error(err);
            networkConsole.warn(
              'FATAL: Cloud PeerJS server unavailable, app is fubar',
            );
            reject(err);
          });
      });
  });
}
