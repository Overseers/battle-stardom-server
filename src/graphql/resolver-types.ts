import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GearedEntity = {
  __typename?: 'GearedEntity';
  mainHand?: Maybe<Weapon>;
  health?: Maybe<Scalars['String']>;
  maxHealth?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Inventory = {
  __typename?: 'Inventory';
  items?: Maybe<Array<Maybe<Item>>>;
  maxSize?: Maybe<Scalars['Int']>;
};

export type Item = {
  __typename?: 'Item';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type Player = {
  __typename?: 'Player';
  mainHand?: Maybe<Weapon>;
  attackSpeed?: Maybe<Scalars['Float']>;
  health?: Maybe<Scalars['String']>;
  maxHealth?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  inventory?: Maybe<Inventory>;
};

export type Query = {
  __typename?: 'Query';
  playerCount?: Maybe<Scalars['Int']>;
  getPlayerData?: Maybe<Player>;
  getEnemies?: Maybe<Array<Maybe<GearedEntity>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  deltaPlayerCount?: Maybe<Scalars['Int']>;
};

export type Weapon = {
  __typename?: 'Weapon';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  maxDamage?: Maybe<Scalars['Float']>;
  minDamage?: Maybe<Scalars['Float']>;
  attackSpeed?: Maybe<Scalars['Float']>;
  modifiers?: Maybe<Array<Maybe<WeaponAffix>>>;
};

export type WeaponAffix = {
  __typename?: 'WeaponAffix';
  name?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  from?: Maybe<WeaponAffixRollable>;
  to?: Maybe<WeaponAffixRollable>;
  isPrefix?: Maybe<Scalars['Boolean']>;
  rollMin?: Maybe<Scalars['Float']>;
  rollMax?: Maybe<Scalars['Float']>;
};

export type WeaponAffixRollable = {
  __typename?: 'WeaponAffixRollable';
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
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
  GearedEntity: ResolverTypeWrapper<GearedEntity>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Inventory: ResolverTypeWrapper<Inventory>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Item: ResolverTypeWrapper<Item>;
  Player: ResolverTypeWrapper<Player>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Weapon: ResolverTypeWrapper<Weapon>;
  WeaponAffix: ResolverTypeWrapper<WeaponAffix>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  WeaponAffixRollable: ResolverTypeWrapper<WeaponAffixRollable>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  GearedEntity: GearedEntity;
  String: Scalars['String'];
  Inventory: Inventory;
  Int: Scalars['Int'];
  Item: Item;
  Player: Player;
  Float: Scalars['Float'];
  Query: {};
  Subscription: {};
  Weapon: Weapon;
  WeaponAffix: WeaponAffix;
  Boolean: Scalars['Boolean'];
  WeaponAffixRollable: WeaponAffixRollable;
};

export type GearedEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['GearedEntity'] = ResolversParentTypes['GearedEntity']> = {
  mainHand?: Resolver<Maybe<ResolversTypes['Weapon']>, ParentType, ContextType>;
  health?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxHealth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InventoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inventory'] = ResolversParentTypes['Inventory']> = {
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  maxSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  mainHand?: Resolver<Maybe<ResolversTypes['Weapon']>, ParentType, ContextType>;
  attackSpeed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  health?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxHealth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inventory?: Resolver<Maybe<ResolversTypes['Inventory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  playerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  getPlayerData?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>;
  getEnemies?: Resolver<Maybe<Array<Maybe<ResolversTypes['GearedEntity']>>>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  deltaPlayerCount?: SubscriptionResolver<Maybe<ResolversTypes['Int']>, "deltaPlayerCount", ParentType, ContextType>;
};

export type WeaponResolvers<ContextType = any, ParentType extends ResolversParentTypes['Weapon'] = ResolversParentTypes['Weapon']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxDamage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minDamage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  attackSpeed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  modifiers?: Resolver<Maybe<Array<Maybe<ResolversTypes['WeaponAffix']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeaponAffixResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeaponAffix'] = ResolversParentTypes['WeaponAffix']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tier?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['WeaponAffixRollable']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WeaponAffixRollable']>, ParentType, ContextType>;
  isPrefix?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rollMin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rollMax?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeaponAffixRollableResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeaponAffixRollable'] = ResolversParentTypes['WeaponAffixRollable']> = {
  min?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  GearedEntity?: GearedEntityResolvers<ContextType>;
  Inventory?: InventoryResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Weapon?: WeaponResolvers<ContextType>;
  WeaponAffix?: WeaponAffixResolvers<ContextType>;
  WeaponAffixRollable?: WeaponAffixRollableResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
