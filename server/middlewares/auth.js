import { generateID } from "../../src/utils/id";

const userIDName = 'userID';

export function auth() {
  return async function (ctx, next) {
    let userID = ctx.cookies.get(userIDName)
    if (!userID) {
      userID = generateID();
      ctx.cookies.set(userIDName, userID, { path: '/api' });
    }
    ctx.userID = userID;
    await next();
  }
}
