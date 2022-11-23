class Keys {
    // Depending on the system you use, the connection string can either be:
    // 1. mongodb://localhost:27017/attendance
    // 2. mongodb://127.0.0.1:27017/attendance
    mongoUri = 'mongodb://127.0.0.1:27017/attendance';
    securityKey = 'MyNotSoSecureSecurityKey';

    get mongoKey() {
        return this.mongoUri;
    }

    get securitykey() {
        return this.securityKey;
    }
}

module.exports = new Keys();