import { rest } from "msw";

type CDNBodyData = {
  session_token: string;
  from: number;
  to: number;
};

const getDayBefore = (date: Date) => {
  const dateDayBefore = new Date(date);
  dateDayBefore.setDate(dateDayBefore.getDate() - 1);
  return dateDayBefore;
};

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
  rest.post<CDNBodyData>("*/bandwidth", (req, res, ctx) => {
    if (!req.body.session_token || !req.body.from || !req.body.to) {
      return res(ctx.status(400));
    }
    return res(
      ctx.json({
        cdn: [
          [Date.now(), 11153433981.013334],
          [getDayBefore(new Date()).getTime(), 18573004048.213333],
        ],
        p2p: [
          [Date.now(), 26918889887.893333],
          [getDayBefore(new Date()).getTime(), 47651621572.480003],
        ],
      })
    );
  }),
  rest.post<CDNBodyData>("*/audience", (req, res, ctx) => {
    if (!req.body.session_token || !req.body.from || !req.body.to) {
      return res(ctx.status(400));
    }
    return res(
      ctx.json({
        audience: [
          [Date.now(), 772],
          [getDayBefore(new Date()).getTime(), 701],
        ],
      })
    );
  }),
];
