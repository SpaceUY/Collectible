import LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });

class Lit {
  private litNodeClient;
  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new Lit();
