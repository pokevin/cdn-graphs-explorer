import { rest } from "msw";

export const handlers = [
  rest.post<{ identifiant?: string; password?: string }>(
    "*/auth",
    (req, res, ctx) => {
      const { identifiant, password } = req.body;
      if (!identifiant || !password) {
        return res(ctx.status(400));
      }
      if (identifiant === "existingUser") {
        return res(ctx.json({ session_token: "token" }));
      }
      return res(ctx.status(404));
    }
  ),
  rest.post<{ session_token?: string }>("*/logout", (req, res, ctx) => {
    const { session_token } = req.body;
    if (!session_token) {
      return res(ctx.status(400));
    }
    return res();
  }),
];
