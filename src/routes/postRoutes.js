const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const { genericMiddleware, postImageMiddleware, tagMiddleware, userMiddleware } = require("../middlewares");
const { createPostSchema, updatePostSchema } = require("../schemas");
const { Post, Tag, User } = require("../db/models");

router.get('/', postController.getAllPosts);

router.post('/',
    genericMiddleware.schemaValidator(createPostSchema),
    postController.createPost
);

router.get('/:id', postController.getPostById);

router.put('/:id',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    genericMiddleware.schemaValidator(updatePostSchema),
    userMiddleware.existUserModelById(User),
    postController.updatePost
);

router.delete('/:id',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    postController.deletePost
);
router.get('/:id/images',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    postController.getPostImages
);
router.get('/:id/tags',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    postController.getPostTags
);
router.post('/:id/images',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    postController.addImageFromPost
);

router.delete('/:id/images/:imageId',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    postImageMiddleware.existImageInPost(),
    postController.removeImageFromPost
);

router.post('/:id/tags/:tagId',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    tagMiddleware.existTagModelById(Tag),
    postController.addTagFromPost
);

router.delete('/:id/tags/:tagId',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    tagMiddleware.existTagModelById(Tag),
    tagMiddleware.existTagInPost(),
    postController.removeTagFromPost
);

router.get('/:id/comments',
    genericMiddleware.validateId,
    genericMiddleware.existModelById(Post),
    commentController.getPostComments
);

module.exports = router;