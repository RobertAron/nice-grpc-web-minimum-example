import { MyApiDefinition, MyApiServiceImplementation } from "common";
import { createServer } from "nice-grpc";
const myImp: MyApiServiceImplementation = {
  async getHello(context, request) {
    return {
      message: `Hello ${context.name}`,
    };
  },
};

const PORT = 9090;
async function main() {
  const server = createServer();
  server.add(MyApiDefinition, myImp);
  const res = await server.listen(`0.0.0.0:${PORT}`);
  console.log(`Server listening ${res}`);
}
main();
