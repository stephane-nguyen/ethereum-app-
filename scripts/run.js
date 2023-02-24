const main = async () => {
  /* get wallet address to deploy to the blockchain */
  // const signers = [owner, randomPerson, randomPerson2, randomPerson3];
  const signers = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(); //create local eth network for the contract
  await waveContract.deployed(); //deployed to our local blockchain

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", signers[0].address);

  await waveContract.getTotalWaves();

  const firstWaveTransaction = await waveContract.wave();
  await firstWaveTransaction.wait();

  const secondWaveTransaction = await waveContract.connect(signers[1]).wave();
  await secondWaveTransaction.wait();

  for (let i = 0; i < 3; i++) {
    const thirdWaveTransaction = await waveContract.connect(signers[2]).wave();
    await thirdWaveTransaction.wait();

    const fourthWaveTransation = await waveContract.connect(signers[3]).wave();
    await fourthWaveTransation.wait();
  }

  await waveContract.getTotalWaves();

  const waveCounts = {};

  for (let i = 0; i < signers.length; i++) {
    const address = await signers[i].address;
    const waveCount = await waveContract.getWavesForAddress(signers[i].address);
    waveCounts[address] = waveCount.toString();
    console.log(address, "has", waveCount.toString(), "waves");
  }
  console.log("Wave counts:", waveCounts);
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
