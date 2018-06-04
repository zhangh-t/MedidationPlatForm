var redis = require("redis")
var redisClient = redis.createClient("6379", "127.0.0.1");
redisClient.auth("84519300");
redisClient.select(1, function (err) {
    console.log(err);
})
exports.client = redisClient;