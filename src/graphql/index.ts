import fs from 'fs';
import path from 'path';
import { RedisPubSub } from 'graphql-redis-subscriptions';
// import { withFilter } from 'graphql-subscriptions';
import redis from 'ioredis';
import { players } from '../data';
import config from '../util/config';
import { withFilter } from 'apollo-server-express';

const redisOptions: redis.RedisOptions = {
    host: config.redisDomainName,
    port: Number(config.redisPort),
    password: config.redisPassword,
    retryStrategy: times => {
        return Math.min(times * 100, 2000);
    }
};

const pubsub = new RedisPubSub({
    publisher: new redis(redisOptions),
    subscriber: new redis(redisOptions)
});

const schema = fs.readFileSync(path.resolve('./src/graphql/schema.graphql')).toString();

const resolvers = {
    Query: {
        playerCount: () => players.playerCount(),
        test: (parent: any, args: any, context: any, info: any) => {
            console.log(parent, args, context, info);
            return 'fuck';
        }
    },
    Subscription: {
        deltaPlayerCount: {
            subscribe: () => pubsub.asyncIterator('deltaPlayerCount')
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
    }
};

export {
    schema,
    resolvers,
    pubsub
};
