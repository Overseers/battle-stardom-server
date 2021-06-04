import { withFilter } from "graphql-subscriptions";
import { pubsub, SessionType } from ".";
import { SubscriptionResolvers } from './resolver-types';
//ts-ignore
export const Subscription: SubscriptionResolvers<SessionType> = {
    deltaPlayerCount: {
        subscribe: (a, b, c) => pubsub.asyncIterator('deltaPlayerCount')
    },
    my_battle: {
        subscribe: (a, b, c) => {
            console.log(a, b, c);
            return pubsub.asyncIterator('my_battle');
        },
        resolve: (payload) => {
            return payload;
        }

    }
    // playerUpdate: {
    //     subscribe: withFilter(
    //         (root, args, context, info) => pubsub.asyncIterator('playerUpdate'),
    //         (payload, variables) => {
    //             console.log('filter:', payload, variables);
    //             return true;
    //         }
    //     )
    // }
};
