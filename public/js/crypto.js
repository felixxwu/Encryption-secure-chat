function encrypt(msg, pass) {
    return CryptoJS.AES.encrypt(msg, pass).toString();
}

function decrypt(encrypted, pass) {
    var decrypted = CryptoJS.AES.decrypt(encrypted, pass);
    return decrypted.toString(CryptoJS.enc.Utf8);
}