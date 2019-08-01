"use strict";
const FormatResponse = require("../utiles/FormatResponse");
module.exports = options => {
  return async function formatResponse(ctx, next) {
    try {
      if (/api*/.test(ctx.url)) {
        try {
          const formatResponse = new FormatResponse();
          formatResponse.getPrm(ctx);
          ctx.formatResponse = formatResponse;
          if (ctx.formatResponse.pageSize > 100) {
            throw new Error("要的太多了");
          }
          await next();
        } catch (error) {
          console.log(error);
          ctx.logger.error(error);
          ctx.status = 200;
          ctx.body = {
            code: error.code || 400,
            msg: error.message,
            status: "failure"
          };
          return;
        }
      } else {
        await next();
      }
    } catch (error) {
      console.log("FormatResponse", error);
    }
  };
};