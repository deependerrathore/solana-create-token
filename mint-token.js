import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { clusterApiUrl, Keypair, Connection, PublicKey } from '@solana/web3.js';
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
  const mint = await createMint(connection, payer, mintAuthority, null, 9);
  console.log('Mint create at:', mint.toBase58());
  return mint;
}

async function mintNewTokens(mint, to, amount) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    new PublicKey(to)
  );

  console.log('Token account created at ', tokenAccount.address.toBase58());

  await mintTo(connection, payer, mint, tokenAccount.address, payer, amount);
  console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
}
async function main() {
  const mint = await createMintForToken(payer, mintAuthority.publicKey);
  await mintNewTokens(mint, mintAuthority.publicKey, 100 * 10 ** 9);
}

main();
