const { validationResult } = require("express-validator");
const ApiErrors = require("../exceptions/api-errors");
const PostService = require("../service/post-service");
const { ObjectId } = require("mongodb");
class PostController {
  async getAllPosts(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ApiErrors("validation error", errors.array()));
      }
      const postData = await PostService.getAllPosts();
      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }
  async getPost(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ApiErrors("Validation error", errors.array()));
      }
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      const postData = await PostService.getPost(id);

      if (!postData) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(postData);
    } catch (e) {
      next(e);
    }
  }
  async createPosts(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ApiErrors("validation error", errors.array()));
      }
      const { title, description, author } = req.body;
      await PostService.createPost({ title, description, author });
      return res.status(200).json({ message: "Post created successfully" });
    } catch (e) {
      next(e);
    }
  }
  async updatePost(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ApiErrors("validation error", errors.array()));
      }
      const { id } = req.params;
      const { title, description, author } = req.body;
      console.log(id, { title, description, author });
      await PostService.updatePost(id, { title, description, author });
      res.status(200).json({ message: "Post updated successfully" });
    } catch (e) {
      next(e);
    }
  }
  async deletePost(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ApiErrors("validation error", errors.array()));
      }
      const { id } = req.params;
      await PostService.deletePost(id);
      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostController();
