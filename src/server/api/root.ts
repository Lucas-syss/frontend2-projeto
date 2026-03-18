import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"
import { cartRouter } from "./routers/cart"
import { stripeRouter } from "./routers/stripe"
import { authRouter } from "./routers/auth"
import { orderRouter } from "./routers/order"
import { userRouter } from "./routers/user"

export const appRouter = createTRPCRouter({
    stripe: stripeRouter,
    cart: cartRouter,
    auth: authRouter,
    order: orderRouter,
    user: userRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
