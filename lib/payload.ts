import "server-only";
import config from "@payload-config";
import { getPayload } from "payload";

// getPayload caches the instance, so this is cheap to call from every query.
export const getPayloadClient = () => getPayload({ config });
