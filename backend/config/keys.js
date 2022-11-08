class Keys {
    mongoUri = 'mongodb://localhost:27017/attendance';
    securityKey = 'MyNotSoSecureSecurityKey';

    get mongoKey() {
        return this.mongoUri;
    }

    get securitykey() {
        return this.securityKey;
    }
}

module.exports = new Keys();