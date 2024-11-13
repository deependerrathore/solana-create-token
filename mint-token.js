import { createMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Keypair, Connection } from '@solana/web3.js';
import fs from 'fs';

const payer = Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(
      fs.readFileSync('/Users/deependersingh/.config/solana/id.json', 'utf-8')
    )
  )
);

const mintAuthority = payer;

const connection = new Connection(clusterApiUrl('devnet'));

async function createMintForToken(payer, mintAuthority) {
  const mint = await createMint(connection, payer, mintAuthority, null, 6);
  console.log('Mint create at:', mint.toBase58());
  return mint;
}

async function main() {
  const mint = await createMintForToken(payer, mintAuthority.publicKey);
}

main();
