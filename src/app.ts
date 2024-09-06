import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { productsRoutes, shopifyRoutes } from "./routes";
import { ZodError } from "zod";
import { swaggerOptions } from "./swagger";

export const app = express();

app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/products", productsRoutes);
app.use("/shopify/products", shopifyRoutes);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);

    if (err instanceof ZodError) {
      return res.status(500).json({
        message: "Erro na validação dos dados",
        error: JSON.parse(err.message),
      });
    }

    res.status(500).json({
      message: "Ocorreu um erro. Tente novamente.",
    });
  }
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
