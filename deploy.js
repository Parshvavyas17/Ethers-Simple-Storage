const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    `http://127.0.0.1:7545`
  );
  const wallet = new ethers.Wallet(
    `31f35ea297d661a4cc068e02a79697b78ca4b98205d5bdd9ad3deba25b8340f9`,
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying.");
  const contract = await contractFactory.deploy();
  console.log(contract);
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  // console.log("Here is deployment transaction: ");
  // console.log(contract.deployTransaction);
  // console.log("Here is transaction receipt: ");
  // console.log(deploymentReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
