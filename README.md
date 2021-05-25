# Decentralized Application to buy and sell eLearning analytics

This is my final degree project of my studies in Computer Engineering at University of Cádiz. It was graded with a 10 out of 10 and was proposed to receive an honorific mention.

This project contains 2 node projects:

- One for the Smart Contract (development, testing, deployment via Truffle and benchmark with Hyperledger Caliper).
- Another inside the `./dapp/` folder which contains the code of a web dApp to interact with the Smart Contract.

Check the [interface gallery](./docs/UserInterface.md) to see how it looked!

Check the [complete documentation](./docs/Francisco-Manuel-Soto-Ramírez-University-Documentation.pdf) of my final degree project (in Spanish)

## Smart Contract

The Smart Contract contains the functionality to register and buy offers, and to submit queries to retrieve offers.

It also contains security considerations:

- The deployer will be the "owner" of the Smart Contract. It can also transfer that ownership.
- The function to buy the offer (the one who recieves Eth) has a reentrancy guard and uses call() to avoid reentrancy attacks.
- Openzeppelin's SafeMath and Counters libraries were used to avoid overflows.
- 3 level circuit breaker, allowing the contract to be active, stopped or accept queries only.
- Access Control: Only the owner can execute functions to change the Smart Contract status, modifying its behavior with the 3 level circuit breaker.
- Deployment following a [proxy pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies), making the Smart Contract code upgradeable.

<br>
<br>
<br>

# Execution

Make sure you run `npm i` for each of these projects (`./` folder and `./dapp/` folder).

You will need truffle and ganache-cli installed for a local deployment. Install them from npm using:

`npm i -g truffle`

## To use a Ganache Blockchain

Install ganache.

`npm i -g ganache-cli`

## To use a Private Geth Blockchain

To deploy using geth with PoW or PoA consensus algorithms, check [My Geth Repo](https://github.com/fransotodev/geth-private-blockchain) and follow the instructions there.

## Run blockchain, tests and deploy Smart Contract

Or use them preceding `npx` to the commands below. Make sure your working directory is the root of this repo.

- Run a ganache blockchain:

  `npm run ganache`

- Run tests:

  `truffle test`

- Deploy to a ganache blockchain (port 8545)

  `npm run migrate <1|2>`

- Deploy to a geth network (to run a geth private blockchian, check [My Geth Repo](https://github.com/fransotodev/geth-private-blockchain))

  `npm run migrate <1|2> geth`

Where 1 or 2 is the version of the Smart Contract to deploy. Keep in mind version 2 is an upgrade of version 1, so you may deploy version 2 only after version 1 is deployed.

Once the contract is deployed to the network, we can start the dApp.

- Populate the ganache blockchain with some data (A simple script so you don't have to register offers one by one. If you want it for one of the geth blockchains, change the port inside `./scripts/populate.js` from 8545 (ganache) to 8001). You will need the data in a file data.js inside the `scripts/` folder.

  `npm run populate`

## Run the LRS.

Currently this app only supports Learning Locker. You need to:

1. [Install Learning Locker](https://docs.learninglocker.net/guides-installing/)
2. Create a store in Learning Locker for every offer you will make (for security permissions)
3. Add some data there, following the xAPI standard
4. Create a dashboard for that data, making it public for anyone
5. Copy the endpoint of the xAPI (you can see it in clients tab), the dashboard link and the client header to access that data. Those are the parameters you submit as an offer.

## Run the web dApp

A web application made with React that interacts to the Smart Contract and the LRS.

1. Make sure you have installed [Metamask](https://metamask.io/download.html) extension in your web browser
2. Inside `dapp/` run `npm run start`
3. Go to `localhost:3000` in your web browser (if something was running in that port, the terminal should tell you which port to go).
4. Import some of the ganache/geth accounts into metamask.
5. Start using the dAPP!

## Run Benchmark

Using Hyperledger Caliper, I did 2 benchmarks. The first one to compare 3 blockchain alternatives (ganache, geth PoW, geth PoA). The second one to compare the Smart Contract functions in geth PoA.

To run the benchmark, make sure you are in the root of this repo and the blockchain you are willing to use is running. You don't need to deploy the Smart Contract, the script does everything. Just run:

`npm run benchmark <ganache|PoW|PoA>`

This script will execute one by one the rounds described in the config files (`./benchmarks/config/<ganache|PoA|PoW>`) and the results will be stored in (`./benchmarks/results/`).
