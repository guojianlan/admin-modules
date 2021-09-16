export interface IJwtOptions {
  secret?: string;
  [key: string]: any;
}

export interface Param {
  controllers: any[];
  providers: any[];
  imports: any[];
  jwtOptions?: IJwtOptions;
}
