const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-Controller');
const postController  = require('../controllers/post-Controller');

//all User APIs
router.get('/', userController.home );
router.post('/api/register',userController.register);
router.get('/api/user',userController.getAllUser);
router.post('/api/authenticate',userController.authenticate);
router.post('/api/follow/:id',userController.followUser);
router.post('/api/unfollow/:id',userController.unfollowUser);

//all post related APIs
router.post('/api/posts',postController.create);
router.post('/api/like/:id',postController.likePost);
router.post('/api/comment/:id',postController.commentPost);
router.post('/api/unlike/:id',postController.unlikePost);
router.delete('/api/posts/:id', postController.deletePost);
router.get('/api/posts/:id',postController.getById);
router.get('/api/all_posts',postController.getAllPosts);



module.exports = router;