
const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    ["Death Knight", "Demon Hunter", "Monk"],       // Names
    ["https://static.wikia.nocookie.net/wowwiki/images/3/30/Death_knight_crest.png/revision/latest/scale-to-width-down/250?cb=20130813094520", // Images
    "https://static.wikia.nocookie.net/wowwiki/images/d/db/Demon_hunter_crest-250x271.png/revision/latest/scale-to-width-down/250?cb=20151004044357", 
    "https://static.wikia.nocookie.net/wowwiki/images/6/60/Monk_crest.png/revision/latest/scale-to-width-down/250?cb=20130817144820"],
    [400, 200, 300],                    // HP values
    [100, 150, 125],
    [10,2,100],
    "Arthas",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FZpMCvFG.jpg&f=1&nofb=1",
    10000,
    50
  );
  await gameContract.deployed();
  console.log("Contract depoyed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  
  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();