import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::order.order", ({ strapi }) => ({
  // GET /api/orders/me
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You must be logged in.");

    const orders = await strapi.entityService.findMany("api::order.order", {
      filters: { user: user.id },
      sort: { createdAt: "desc" },
      populate: {
        user: { fields: ["id", "username", "email"] },
      },
    });

    // sanitize output
    const sanitized = await this.sanitizeOutput(orders, ctx);
    ctx.body = sanitized;
  },

  // POST /api/orders  (override)
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You must be logged in.");

    const body = ctx.request.body?.data || ctx.request.body; 
    // بعض الناس بتبعت {data:{...}} وبعضهم {...}

    const items = body?.items;
    const total = body?.total;
    const order_status = body?.order_status || "pending";

    if (!Array.isArray(items) || items.length === 0) {
      return ctx.badRequest("items is required and must be an array");
    }
    if (typeof total !== "number") {
      return ctx.badRequest("total must be a number");
    }

    const created = await strapi.entityService.create("api::order.order", {
      data: {
        items,
        total,
        order_status,
        user: user.id, // أهم سطر
      },
      populate: {
        user: { fields: ["id", "username", "email"] },
      },
    });

    const sanitized = await this.sanitizeOutput(created, ctx);
    ctx.body = sanitized;
  },
}));