import React from "react";

const Info = () => {
  return (
    <div className="container">
      <br />
      <h1 className="text-center">Getting Started</h1>
      <p className="lead">
        Looks like you don't have an <strong>Ethereum browser</strong>. Follow
        this guide to start using this app.
      </p>
      <br />

      <h2 className="text-left">1. Install Metamask</h2>
      <p className="lead">
        Go to{" "}
        <a target="_blank" rel="noreferrer" href="https://metamask.io/">
          Metamask's Website{" "}
        </a>
        and download the extension on your web browser or the app on your
        smartphone.
      </p>

      <br />
      <h2 className="text-left">2. Import your account to Metamask</h2>
      <p className="lead">
        Import an existing Ethereum account or add funds to a new Account. You
        can create a new one on Metamask. <br></br>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://ethereum.org/en/developers/docs/accounts/"
        >
          More info about accounts{" "}
        </a>
      </p>
      <br />

      <h2 className="text-left">3. Start using this app!</h2>
      <p className="lead">Reload on your browser to access the app.</p>
    </div>
  );
};

export default Info;
