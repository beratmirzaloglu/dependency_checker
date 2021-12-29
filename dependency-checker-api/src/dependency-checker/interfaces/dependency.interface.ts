export interface IDependencies {
  dependencies: IDependency[];
  devDependencies: IDependency[];
}

export interface IDependency {
  name: string;
  version: string;
}
