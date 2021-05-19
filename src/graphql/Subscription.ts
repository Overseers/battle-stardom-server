import { withFilter } from "graphql-subscriptions";
import { pubsub } from ".";
import { SubscriptionResolvers } from './resolver-types';

export const Subscription: SubscriptionResolvers<{
    session: string,
    email: string;
}> = {
    deltaPlayerCount: {
        subscribe: (a, b, c) => pubsub.asyncIterator('deltaPlayerCount')
    },
    playerUpdate: {
        subscribe: withFilter(
            (root, args, context, info) => pubsub.asyncIterator('playerUpdate'),
            (payload, variables) => {
                console.log('filter:', payload, variables);
                return true;
            }
        )
    }
};
