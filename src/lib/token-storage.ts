const tokenKey = 'heltekAuthToken';

class TokenStorage {
  public static store (token: string) : void {
    sessionStorage.setItem(tokenKey, token);
  }

  public static revoke () : void {
    sessionStorage.removeItem(tokenKey);
  }

  public static getToken() : string | null {
    return sessionStorage.getItem(tokenKey);
  }

  public static hasToken() : boolean {
    return Boolean(TokenStorage.getToken())
  }
}

export default TokenStorage;