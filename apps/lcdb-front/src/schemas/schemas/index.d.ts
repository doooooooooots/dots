export interface EntitySchema {
  singular: string;
  plurial: string;
  defaultFields?: any;
  customActions?: any;
  fields?: any;
  defaultColumns: string[];
  defaultSingle?: string[];
  columns: {
    [key: string]: DotsColumnProps;
  };
}

export interface EntitySchemaEnhanced extends EntitySchema {
  defaultFindManyQuery: string; // Generated from defaultColumns
}

export interface EntityContext extends EntitySchemaEnhanced {
  graphql: GraphQlApiType;
}
