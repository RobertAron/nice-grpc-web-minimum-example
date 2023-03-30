import { createChannel, createClient } from "nice-grpc-web";
import { MyApiClient, MyApiDefinition } from "common";
import { useEffect } from "react";

const channel = createChannel("localhost:8080");
const client: MyApiClient = createClient(MyApiDefinition, channel);

export default function Home() {
  useEffect(() => {
    (async function () {
      const res = await client.getHello({ name: "Robert" });
      console.log(res.message);
    })();
  }, []);
  return "Hello world!";
}
