import { createChannel, createClient } from "nice-grpc";
import { MyApiClient, MyApiDefinition } from "common";

const channel = createChannel("host.docker.internal:8080");
const client: MyApiClient = createClient(MyApiDefinition, channel);

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
async function main() {
  // wait to make sure envoy and all are up
  await delay(1000);
  const res = await client.getHello({ name: "Robert"});
  console.log(res.message);
}

main();
