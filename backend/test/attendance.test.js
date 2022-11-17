let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Some routes require roles: use this in the authorization header:
// e.g. userTokens.adminToken for admin token
const userTokens = {
    adminToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRjMyIsImVtYWlsIjoidC5ub3J0aEBhZG1pbi51b3BzLmFjLnVrIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNjY4Njg3MjY1fQ.7knyeWGZqnRbJZh6cosdQfqrfYll5vdCCd6vfeHuODM",
    moduleLeaderToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRjMSIsImVtYWlsIjoicy5ob29wZXJAc3RhZmYudW9wcy5hYy51ayIsInJvbGVzIjpbIlN0YWZmIiwiVHV0b3IiLCJNb2R1bGUgTGVhZGVyIl0sImlhdCI6MTY2ODY4NzM3NX0.gbDaWsGg4mMdtHmpVSDT-kKai96yZLbZ1nqYWGodmrc",
    tutorToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRiZiIsImVtYWlsIjoiai5yb2JiaW5zQHN0YWZmLnVvcHMuYWMudWsiLCJyb2xlcyI6WyJTdGFmZiIsIlR1dG9yIl0sImlhdCI6MTY2ODY4NzUwM30.ASqGaGD7_UZrhGlmKh8JxdldPWXb2TXLAhvaxSn8Fhc",
    studentToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxNDU0NTQ1MWEwNGU3MmQ5OTRiMSIsImVtYWlsIjoiMTAwMjAwQHN0dWRlbnQudW9wcy5hYy51ayIsInJvbGVzIjpbIlN0dWRlbnQiXSwiaWF0IjoxNjY4Njg3NTIwfQ.atXjTwbXykRe7bjTBOpOO-yzZOY4WYteEc1CYiEv-pA"
}

// TODO:
// 1. Test registering a code that is invalid (should fail)
// 2. Test registering a code when register has not been activated (should fail)
// 3. Test registering a code where the user is not part of the active register (should fail)
// 4. Test registering a students attendance that has already registered their attendance (should fail)
// 5. Test registering a students attendance successfully
// 6. Test registering a code without authentication (should fail)
// 7. Test registering a code without student authorization (should fail)
// 8. Test editing a students attendance with a fake register ID (should fail)
// 9. Test editing a students attendance where register is not active (should fail)
// 10. Test editing a students attendance where tutor is not part of the active register (should fail)
// 11. Test editing a students attendance where the student is not part of the active register (should fail)
// 12. Test editing a students attendance without authentication (should fail)
// 13. Test editing a students attendance without tutor authorization (should fail)
// 14. Test successfully editing a students attendance

// Have a look how I did login and register tests in user.test.js if ur struggling