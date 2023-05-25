import { MyApiDefinition, MyApiServiceImplementation } from "common";
import { CallContext, ServerMiddlewareCall, createServer } from "nice-grpc";
const myImp: MyApiServiceImplementation = {
  async getHello(context, request) {
    return {
      message: `Hello ${context.name}`,
    };
  },
};

async function* authMiddleware<Request, Response>(
  call: ServerMiddlewareCall<Request, Response, {}>,
  context: CallContext
) {
  console.log("in middleware");
  console.log(Array.from(context.metadata))
  return yield* call.next(call.request, {
    ...context,
  });
}

const PORT = 9090;
async function main() {
  const server = createServer().use(authMiddleware);
  server.add(MyApiDefinition, myImp);
  const res = await server.listen(`0.0.0.0:${PORT}`);
  console.log(`Server listening ${res}`);
}
main();
