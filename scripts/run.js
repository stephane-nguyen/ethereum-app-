const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); //get wallet address to deploy to the blockchain
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(); //create local eth network for the contract
  await waveContract.deployed(); //deployed to our local blockchain

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  await waveContract.getTotalWaves();

  const firstWaveTransaction = await waveContract.wave();
  await firstWaveTransaction.wait();

  await waveContract.getTotalWaves();

  const secondWaveTransaction = await waveContract
    .connect(owner.address)
    .waveTo(waveContract.address);
  await secondWaveTransaction.wait();

  const thirdWaveTransaction = await waveContract
    .connect(randomPerson.address)
    .waveTo(owner.address);
  await thirdWaveTransaction.wait();

  const fourthWaveTransaction = await waveContract
    .connect(owner.address)
    .waveTo(randomPerson.address);
  await fourthWaveTransaction.wait();

  await waveContract.getTotalWaves();

  await waveContract.getNumberOfWavesSentByAddress(
    randomPerson.address,
    owner.address
  );

  await waveContract.getMostWavesSender(owner.address);
  await waveContract.getMostWavesSender(randomPerson.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit node process without error
  } catch (e) {
    console.log(e);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();
