import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));

async function airdrop(publicKey, amount) {
  const airdropSignature = await connection.requestAirdrop(
    new PublicKey(publicKey),
    amount
  );
  await connection.confirmTransaction({ signature: airdropSignature });
}

airdrop('6AXcCp7qziUoFamcbfZjvEfujyzxBUxx3jKTraCWVFkc', LAMPORTS_PER_SOL).then(
  (signature) => {
    console.log('Airdrop signature:', signature);
  }
);
