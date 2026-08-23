"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::order.order",
  ({ strapi }) => ({

    // =========================
    // CREATE ORDER
    // =========================
    async create(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const data = ctx.request.body?.data || {};

      const order = await strapi
        .documents("api::order.order")
        .create({
          data: {
            total: data.total,
            shippingAddress: data.shippingAddress,
            phone: data.phone,
            orderStatus: data.orderStatus || "Pending",
            products: data.products || [],

            user: {
              connect: [user.id],
            },
          },

          populate: {
            user: true,
          },
        });

      ctx.body = {
        data: order,
      };
    },

    // =========================
    // GET MY ORDERS
    // =========================
    async me(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const orders = await strapi
        .documents("api::order.order")
        .findMany({
          filters: {
            user: {
              id: user.id,
            },
          },
          populate: "*",
          sort: ["createdAt:desc"],
        });

      ctx.body = {
        data: orders,
      };
    },

  })
);