export interface IDependencies {
  dependencies: IDependency[];
  devDependencies: IDependency[];
}

interface IDependency {
  name: string;
  version: string;
}
