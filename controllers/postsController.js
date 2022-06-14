const { publicPosts, privatePosts } = require("../database");


class postsController {

    static getPublicPosts = (req, res) => {
        res.json(publicPosts);
      }

    static getPrivatePosts = (req, res) => {
        res.json(privatePosts);
      }
}

module.exports = postsController