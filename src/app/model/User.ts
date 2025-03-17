export interface UserIndexSignature {
  [key: string]: string;
}

export type User<T extends string> = UserIndexSignature & {
  [K in T]: string;
}
