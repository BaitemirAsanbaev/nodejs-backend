const PostModel = require("../models/post");
class PostService {
  async getAllPosts() {
    return PostModel.find();
  }
  async getPost(id) {
    return PostModel.findById(id);
  }
  async createPost(post) {
    return PostModel.create(post);
  }
  async updatePost(id, post) {
    return PostModel.findByIdAndUpdate(id, post, { new: true });
  }
  async deletePost(id) {
    return PostModel.findByIdAndDelete(id);
  }
}

module.exports = new PostService();
