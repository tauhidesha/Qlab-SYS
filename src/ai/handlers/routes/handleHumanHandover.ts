import type { RouteHandlerFn } from "./types";

export const handleHumanHandover: RouteHandlerFn = async ({ session }) => {
  return {
    reply: { message: 'Oke, Zoya panggilin admin ya 🙋‍♀️' },
    updatedSession: {
      ...session,
      lastRoute: 'human',
    }
  };
};
