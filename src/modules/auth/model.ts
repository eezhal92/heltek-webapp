import { ManagementPermissions } from "lib/permission";

export interface UserRole {
  name: string;
  permissions: ManagementPermissions[];
}

export interface AuthUser {
  name: string;
  email: string;
  roles: UserRole[];
  isNil() : boolean;
  hasPermission(permission: ManagementPermissions): boolean;
  permissions: Set<ManagementPermissions>;
}

export class User implements AuthUser {
  name: string;
  email: string;
  roles: UserRole[];

  constructor (name: string, email: string, roles: UserRole[]) {
    this.name = name;
    this.email = email;
    this.roles = roles;
  }

  public get permissions () : Set<ManagementPermissions> {
    const permissions: ManagementPermissions[] = [];
    return new Set(this.roles.reduce((permissions, role) => {
      return permissions.concat(role.permissions);
    }, permissions));
  }

  public hasPermission(permission: ManagementPermissions) {
    return this.permissions.has(permission);
  }

  public isNil() : boolean {
    return false;
  }
}

export class NilUser implements AuthUser  {
  public name: string = '';
  public email: string = '';
  roles: UserRole[] = [];

  public isNil() : boolean {
    return true;
  }

  get permissions() : Set<ManagementPermissions> {
    return new Set();
  }

  public hasPermission(permission: ManagementPermissions): boolean {
    return false;
  };
}