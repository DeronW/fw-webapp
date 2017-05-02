(function () {

    var PUB_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVjGX1KREQkVBBPYD2zBgieQFcJEi77xPpUZJx5PVJTLqxjKROmm4IUgB3QScLrQs4KueKtWIXzOkmpR6gJB5qPq3ULtRdE0Y39iZ57t8D8wTxQfzLcRWIWM689HdZGmceJf5VZd7x8Qb5n157EoXYLKcIqlfr9uSOeXYuhmP8PQIDAQAB';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUB_KEY);

    $FW.Enc = function (s) {
        var strForEnc = String(s);
        return encrypt.encrypt(strForEnc);
    }

})()
