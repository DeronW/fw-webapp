(function (CipherFactory, salt, name_of_setPublickKey, name_of_encrypt, fromCharCode) {

    $FW.Cryption = {
        _pk: null,
        _rn: function (arr) {
            var n = '', xor = 255 ^ salt;
            arr.forEach(function (i) {
                n += fromCharCode(xor ^ i)
            })
            return n
        },
        init: function (v) { this._pk = v },
        encrypt: function (plain) {
            if (!this._pk) throw new Error('not set KEY yet')
            if (!CipherFactory) throw new Error('cipher factory method set KEY yet')
            var c = new CipherFactory()
            c[this._rn(name_of_setPublickKey)](this._pk)
            return c[this._rn(name_of_encrypt)](String(plain))
        }
    }

})(window.JSEncrypt, 0,
    [140, 154, 139, 175, 138, 157, 147, 150, 156, 180, 154, 134],
    [154, 145, 156, 141, 134, 143, 139],
    String.fromCharCode);

(function () {
    // set publick key
    $FW.Cryption.init(
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVjGX1KREQkVBBPYD2zBgieQFcJEi77xPpUZJx5PVJTLqxjKROmm4IUgB3QScLrQs4KueKtWIXzOkmpR6gJB5qPq3ULtRdE0Y39iZ57t8D8wTxQfzLcRWIWM689HdZGmceJf5VZd7x8Qb5n157EoXYLKcIqlfr9uSOeXYuhmP8PQIDAQAB')
})();

// for test encryption
(function () {

//     var pubk2 = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
// FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
// xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
// gwQco1KRMDSmXSMkDwIDAQAB
// -----END PUBLIC KEY-----`

//     var prk2 = `-----BEGIN RSA PRIVATE KEY-----
// MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
// WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
// aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
// AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
// xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
// m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
// 8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
// z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
// rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
// V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
// aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
// psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
// uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
// -----END RSA PRIVATE KEY-----`



//     var encrypt = new JSEncrypt();
//     encrypt.setPublicKey(pubk2);
//     var encrypted = encrypt.encrypt('only use JSEncrypt');

//     $FW.Cryption.init(pubk2)
//     var encrypted2 = $FW.Cryption.encrypt('use in $FW.Cryption')
//     var decrypt = new JSEncrypt();
//     decrypt.setPrivateKey(prk2);
//     var uncrypted = decrypt.decrypt(encrypted);
//     var uncrypted2 = decrypt.decrypt(encrypted2);


//     console.log("============")
//     console.log('decrypt JSEncrypt msg: ', uncrypted)
//     console.log("============")
//     console.log('decrypt $FW msg: ', uncrypted2)


})()


