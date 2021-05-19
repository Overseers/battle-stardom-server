import fs from 'fs';
import path from 'path';
import { RedisPubSub } from 'graphql-redis-subscriptions';
// import { withFilter } from 'graphql-subscriptions';
import redis from 'ioredis';
import { players, session } from '../data';
import config from '../util/config';
import { withFilter } from 'apollo-server-express';
import { Query } from './Query';
import { Subscription } from './Subscription';
import { Mutation } from './Mutation';
import { Resolvers, ResolverFn } from './resolver-types';
import Entity from '../logic/entities';

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

export interface SessionType {
    session: string,
    email: string;
}

const resolvers: Resolvers<SessionType> = {
    Query,
    // Mutation,
    Subscription
};

export {
    schema,
    resolvers,
    pubsub
};
