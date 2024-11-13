import { createMint } from '@solana/spl-token';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Keypair, Connection } from '@solana/web3.js';
import fs from 'fs';

const payer = Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(
      fs.readFileSync('/Users/deependersingh/.config/solana/id.json', 'utf-8')
    )
  )
);

console.log(payer);
