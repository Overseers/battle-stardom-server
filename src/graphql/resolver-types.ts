import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Enemy = {
  __typename?: 'Enemy';
  attackPower?: Maybe<Scalars['Int']>;
  defensePower?: Maybe<Scalars['Int']>;
  life?: Maybe<Scalars['Int']>;
  attacksPerSecond?: Maybe<Scalars['Int']>;
};

export type EnemyEntity = {
  __typename?: 'EnemyEntity';
  health?: Maybe<Scalars['Int']>;
  maxHealth?: Maybe<Scalars['Int']>;
  defencePower?: Maybe<Scalars['Int']>;
  attackPower?: Maybe<Scalars['Int']>;
  mainHand?: Maybe<Weapon>;
  name?: Maybe<Scalars['String']>;
};

export type Player = {
  __typename?: 'Player';
  email: Scalars['String'];
  uid: Scalars['String'];
};

export type PlayerEntity = {
  __typename?: 'PlayerEntity';
  health?: Maybe<Scalars['Int']>;
  maxHealth?: Maybe<Scalars['Int']>;
  defencePower?: Maybe<Scalars['Int']>;
  attackPower?: Maybe<Scalars['Int']>;
  weapon?: Maybe<Weapon>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  playerCount?: Maybe<Scalars['Int']>;
  test?: Maybe<Scalars['String']>;
  getEnemies?: Maybe<Array<Maybe<EnemyEntity>>>;
  getPlayer?: Maybe<PlayerEntity>;
};

export type Subscription = {
  __typename?: 'Subscription';
  deltaPlayerCount?: Maybe<Scalars['Int']>;
  playerUpdate?: Maybe<Player>;
};


export type SubscriptionPlayerUpdateArgs = {
  uuid: Scalars['String'];
};

export type Weapon = {
  __typename?: 'Weapon';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  minDamage?: Maybe<Scalars['Float']>;
  maxDamage?: Maybe<Scalars['Float']>;
  attackSpeed?: Maybe<Scalars['Float']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Enemy: ResolverTypeWrapper<Enemy>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  EnemyEntity: ResolverTypeWrapper<EnemyEntity>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Player: ResolverTypeWrapper<Player>;
  PlayerEntity: ResolverTypeWrapper<PlayerEntity>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Weapon: ResolverTypeWrapper<Weapon>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Enemy: Enemy;
  Int: Scalars['Int'];
  EnemyEntity: EnemyEntity;
  String: Scalars['String'];
  Player: Player;
  PlayerEntity: PlayerEntity;
  Query: {};
  Subscription: {};
  Weapon: Weapon;
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
};

export type EnemyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Enemy'] = ResolversParentTypes['Enemy']> = {
  attackPower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  defensePower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  life?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  attacksPerSecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnemyEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnemyEntity'] = ResolversParentTypes['EnemyEntity']> = {
  health?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxHealth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  defencePower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  attackPower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  mainHand?: Resolver<Maybe<ResolversTypes['Weapon']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerEntity'] = ResolversParentTypes['PlayerEntity']> = {
  health?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxHealth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  defencePower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  attackPower?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  weapon?: Resolver<Maybe<ResolversTypes['Weapon']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  playerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getEnemies?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnemyEntity']>>>, ParentType, ContextType>;
  getPlayer?: Resolver<Maybe<ResolversTypes['PlayerEntity']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  deltaPlayerCount?: SubscriptionResolver<Maybe<ResolversTypes['Int']>, "deltaPlayerCount", ParentType, ContextType>;
  playerUpdate?: SubscriptionResolver<Maybe<ResolversTypes['Player']>, "playerUpdate", ParentType, ContextType, RequireFields<SubscriptionPlayerUpdateArgs, 'uuid'>>;
};

export type WeaponResolvers<ContextType = any, ParentType extends ResolversParentTypes['Weapon'] = ResolversParentTypes['Weapon']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minDamage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxDamage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  attackSpeed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Enemy?: EnemyResolvers<ContextType>;
  EnemyEntity?: EnemyEntityResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerEntity?: PlayerEntityResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Weapon?: WeaponResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
