# Decentralized Application to buy and sell elearning generated data from a LRS

This repo contains the Smart Contract, tests and client web dApp to buy and sell eLearning data following the xAPI standard. This project was presented as my final project of my studies of Computer Engineering at Cadiz University.

This project contains 2 node projects

- One for the Smart Contract (Development, testing and deployment via truffle)
- Another inside the folder `dapp` which contains the code of a web dApp to interact with the Smart Contract

Therefore make sure you run `npm i` for each of these projects.

_Coming soon: Benchmark of the Smart Contract in another repo_

## Smart Contract

The Smart Contract contains the funcionality to register and buy offers, and to submit queries to retrieve offers.

#TODO: Finish Security considerations.

## Run tests, compile, deploy Smart Contract

YOu will need truffle and ganache-cli installed for a local deployment. Install them from npm using:
`npm i -g truffle`
`npm i -g ganache-cli`

Or use them with preceding `npx` to the commands below

- Run a ganache blockchain:

  `ganache-cli`

- Compile Contracts:

  `truffle compile`

- Run tests:

  `truffle test`

- Deploy to a ganache-cli network (port 8545)

  `truffle migrate --network development`

Keep in mind that ganache's GUI application uses a different port, you may modify it in `truffle-config.js` file

Once the contract is deployed to the network, we can start the dApp

## Run the LRS.

Currently this app only supports Learning Locker. You need either:

#TODO: Share the Ubuntu Server Virtual Machine and save link I used

or

1. Install Learning Locker in your machine or another machine
2. Add some data there, following the xAPI standard
3. Create a store in Learning Locker for every offer you will make (for security permissions)
4. Create a dashboard for that data, making it public for anyone
5. Copy the endpoint of the xAPI (you can see it in clients tab), the dashboard link and the client header to access that data, this is the parameters you submit as an offer.

Of course you can use this dApp to connect to your own Learning Locker instance.

## Client dApp

1. Make sure you have installed [Metamask](https://metamask.io/download.html) extension in your web browser
2. Inside `dapp/`, run `npm run start`
3. Go to localhost:3000 in your web browser (if something was running in that port, the terminal should tell you which port to go)
4. Import some of the ganache accounts into metamask
5. Start using the dAPP! (I suggest you register offers with one account, buy with another...)
