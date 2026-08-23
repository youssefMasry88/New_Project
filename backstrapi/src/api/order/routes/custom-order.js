"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/orders/me",
      handler: "order.me",
      config: {
        auth: {},
      },
    },
  ],
};