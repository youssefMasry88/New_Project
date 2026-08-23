"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/wishlist/me",
      handler: "api::wishlist.wishlist.me",
      config: {},
    },
    {
      method: "POST",
      path: "/wishlist/toggle",
      handler: "api::wishlist.wishlist.toggle",
      config: {},
    },
  ],
};