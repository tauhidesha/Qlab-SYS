import type { RouteHandlerFn } from "./types";

export const handleGenericPriceInquiry: RouteHandlerFn = async ({ session }) => {
  return {
    reply: { message: 'Berikut daftar harga layanan kami bro...' },
    updatedSession: {
      ...session,
      lastRoute: 'price',
    }
  };
};
