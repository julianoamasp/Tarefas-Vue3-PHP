export default {
    setCookieUsuario(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getCookieUsuario() {
        let name = "usuario=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    clearCookies() {
        document.cookie = "usuario=;expires=Thu, 01 Jan 1970"
    },
    checkCookieUsuario() {
        let user = this.getCookieUsuario("usuario");
        if (user != "") {
            return true;
        } else {
            return false;
        }
    }
}
