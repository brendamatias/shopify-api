import "@shopify/shopify-api/adapters/node";

import {
  shopifyApi,
  LATEST_API_VERSION,
  Session,
  AuthScopes,
  SessionParams,
} from "@shopify/shopify-api";
import { env } from "./env";

const HOST_NAME = "siclo-case-api.com";

const shopify = shopifyApi({
  apiKey: env.SHOPIFY_API_KEY,
  apiSecretKey: env.SHOPIFY_API_SECRET,
  scopes: ["read_products", "write_products"],
  hostName: HOST_NAME,
  isEmbeddedApp: true,
  apiVersion: LATEST_API_VERSION,
});

const session: Session = {
  shop: env.SHOPIFY_SHOP_URL,
  accessToken: env.SHOPIFY_ACCESS_TOKEN,
  id: "",
  state: "",
  isOnline: false,
  isActive: function (
    scopes: string | string[] | AuthScopes | undefined
  ): boolean {
    throw new Error("Function not implemented.");
  },
  isScopeChanged: function (
    scopes: string | string[] | AuthScopes | undefined
  ): boolean {
    throw new Error("Function not implemented.");
  },
  isScopeIncluded: function (scopes: string | string[] | AuthScopes): boolean {
    throw new Error("Function not implemented.");
  },
  isExpired: function (
    withinMillisecondsOfExpiry?: number | undefined
  ): boolean {
    throw new Error("Function not implemented.");
  },
  toObject: function (): SessionParams {
    throw new Error("Function not implemented.");
  },
  equals: function (other: Session | undefined): boolean {
    throw new Error("Function not implemented.");
  },
  toPropertyArray: function (
    returnUserData?: boolean | undefined
  ): [string, string | number | boolean][] {
    throw new Error("Function not implemented.");
  },
};

export { shopify, session };
