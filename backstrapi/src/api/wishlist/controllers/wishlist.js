"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wishlist.wishlist",
  ({ strapi }) => ({

    // =========================
    // GET MY WISHLIST
    // =========================
    async me(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const wishlist = await strapi
        .documents("api::wishlist.wishlist")
        .findFirst({
          filters: {
            users: {
              id: user.id,
            },
          },
          populate: {
            products: {
              populate: {
                coverImage: true,
                hover_image: true,
                category: true,
              },
            },
          },
        });

      if (!wishlist) {
        ctx.body = {
          products: [],
        };

        return;
      }

      ctx.body = {
        products: wishlist.products || [],
      };
    },

    // =========================
    // TOGGLE WISHLIST
    // =========================
    async toggle(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const { productId } = ctx.request.body;

      if (!productId) {
        return ctx.badRequest("productId is required");
      }

      // =========================
      // FIND PRODUCT
      // =========================
      const product = await strapi
        .documents("api::product.product")
        .findOne({
          documentId: String(productId),
        });

      if (!product) {
        return ctx.notFound("Product not found");
      }

      // =========================
      // FIND USER WISHLIST
      // =========================
      let wishlist = await strapi
        .documents("api::wishlist.wishlist")
        .findFirst({
          filters: {
            users: {
              id: user.id,
            },
          },
          populate: {
            products: {
              populate: {
                coverImage: true,
                hover_image: true,
                category: true,
              },
            },
          },
        });

      // =========================
      // CREATE WISHLIST
      // =========================
      if (!wishlist) {
        wishlist = await strapi
          .documents("api::wishlist.wishlist")
          .create({
            data: {
              users: user.id,
              products: {
                connect: [product.documentId],
              },
            },

            populate: {
              products: {
                populate: {
                  coverImage: true,
                  hover_image: true,
                  category: true,
                },
              },
            },
          });

        ctx.body = {
          added: true,
          wishlist,
        };

        return;
      }

      const products = wishlist.products || [];

      const exists = products.some(
        (item) => item.documentId === product.documentId
      );

      // =========================
      // REMOVE PRODUCT
      // =========================
      if (exists) {
        const updated = await strapi
          .documents("api::wishlist.wishlist")
          .update({
            documentId: wishlist.documentId,

            data: {
              products: {
                disconnect: [product.documentId],
              },
            },

            populate: {
              products: {
                populate: {
                  coverImage: true,
                  hover_image: true,
                  category: true,
                },
              },
            },
          });

        ctx.body = {
          added: false,
          wishlist: updated,
        };

        return;
      }

      // =========================
      // ADD PRODUCT
      // =========================
      const updated = await strapi
        .documents("api::wishlist.wishlist")
        .update({
          documentId: wishlist.documentId,

          data: {
            products: {
              connect: [product.documentId],
            },
          },

          populate: {
            products: {
              populate: {
                coverImage: true,
                hover_image: true,
                category: true,
              },
            },
          },
        });

      ctx.body = {
        added: true,
        wishlist: updated,
      };
    },
  })
);