import { createCallerFactory, createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { cartRouter } from "./routers/cart"
import { z } from "zod"

/**
 * This is the primary router for the server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    cart: cartRouter,
    example: createTRPCRouter({
        hello: publicProcedure
            .input(z.object({ text: z.string() }))
            .query(({ input }) => {
                return {
                    greeting: `Hello ${input.text}`,
                }
            }),
    }),
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
