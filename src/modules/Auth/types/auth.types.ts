export type AuthJWTPayload = {
  sub: string;
  phoneNumber: string;
  name: string;
  iat?: number;
  exp?: number;
};

export type AuthFromJwt = {
  id: string;
  phoneNumber: string;
  name: string;
};
