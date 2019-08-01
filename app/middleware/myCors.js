"use strict";
module.exports = options => {
  return async function myCors(ctx, next) {
    console.log('ctx.headers.origin', ctx.headers.origin)
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set("Access-Control-Allow-Origin", ctx.headers.origin || '*');
    ctx.set("Access-Control-Allow-Headers", 'Content-Type,Authorization,X-Requested-With,X-CSRF-Token');
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (ctx.method === "OPTIONS") {
      ctx.body = 1;
      ctx.status = 200;
      return;
    }
    await next();
  };
};