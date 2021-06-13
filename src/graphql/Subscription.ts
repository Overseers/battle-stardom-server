import { withFilter } from "graphql-subscriptions";
import { pubsub, SessionType } from ".";
import { SubscriptionResolvers, SubscriptionResolver } from './resolver-types';
// ts-ignore
export const Subscription: SubscriptionResolvers<SessionType> = {
    deltaPlayerCount: {
        subscribe: (a, b, c) => pubsub.asyncIterator('deltaPlayerCount')
    },
    my_battle: {
        subscribe: withFilter(() => pubsub.asyncIterator('my_battle'), (a, b, c, d) => {
            // console.log("PAY ATTENTION", a, b, c, d);

            return a.battleOwner === c.session;
        }),
        resolve: (payload) => {
            return Object.keys(payload).reduce((acc, next) => {
                if (next !== 'id') {
                    acc[next] = payload[next];
                }
                return acc;
            }, {});
        }

    },
    onBattleFinish: {
        subscribe: withFilter(() => pubsub.asyncIterator('onBattleFinish'), (data, _, context) => {
            console.log(data);
            return data.id === context.session;
        }),
        resolve: (payload) => {
            return Object.keys(payload).reduce((acc, next) => {
                if (next !== 'id') {
                    acc[next] = payload[next];
                }
                return acc;
            }, {});
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
