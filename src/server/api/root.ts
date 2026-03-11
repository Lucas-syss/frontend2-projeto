import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"
import { cartRouter } from "./routers/cart"
import { stripeRouter } from "./routers/stripe"
import { authRouter } from "./routers/auth"
import { orderRouter } from "./routers/order"

export const appRouter = createTRPCRouter({
    stripe: stripeRouter,
    cart: cartRouter,
    auth: authRouter,
    order: orderRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
