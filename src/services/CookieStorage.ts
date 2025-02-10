export default class CookieStorage {
  private static _instance: CookieStorage;

  public static getInstance(): CookieStorage {
    if (!CookieStorage._instance) {
      CookieStorage._instance = new CookieStorage();
    }

    return CookieStorage._instance;
  }

  public Set(key: string, val: string, attributes: object = {}): void {
    attributes = {
      path: '/',
      // add other defaults here if necessary
      ...attributes
    };

    if (attributes.expires instanceof Date) {
      attributes.expires = attributes.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(key) + "=" + encodeURIComponent(val);

    for (let attributeKey in attributes) {
      updatedCookie += "; " + attributeKey;
      let attributeValue = attributes[attributeKey];
      if (attributeValue !== true) {
        updatedCookie += "=" + attributeValue;
      }
    }

    document.cookie = updatedCookie;
  }

  public Get(key: string): string {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}
