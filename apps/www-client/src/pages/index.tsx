import {
  CallOptions,
  ClientMiddlewareCall,
  Metadata,
  createChannel,
  createClient,
  createClientFactory,
} from "nice-grpc-web";
import { MyApiClient, MyApiDefinition } from "common";
import { useEffect } from "react";

const channel = createChannel("http://localhost:8080");

async function* middleware<Request, Response>(
  call: ClientMiddlewareCall<Request, Response>,
  options: CallOptions
) {
  console.log("in middleware");
  return yield* call.next(call.request, {
    ...options,
    metadata: Metadata(options.metadata)
      .set("Authorization", `Bearer myCoolToken`)
      .set("CustomField", "CustomValue"),
  });
}

const client: MyApiClient = createClientFactory()
  .use(middleware)
  .create(MyApiDefinition, channel);

export default function Home() {
  useEffect(() => {
    (async function () {
      const res = await client.getHello({ name: "Robert" });
      console.log(res.message);
    })();
  }, []);
  return "Hello world!";
}
