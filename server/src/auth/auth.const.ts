export interface JwtPayload {
  sub: string;
  name: string;
  provider: string;
  picture: string;
  roomId?: string;
}
