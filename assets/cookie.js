---
---

export class Cookie {
      static setCookie (name, value, days = 7, path = '/')  {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
    }

     static getCookie (name)  {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r
        }, '')
    }

     static deleteCookie (name, path) {
        setCookie(name, '', -1, path)
    }
}