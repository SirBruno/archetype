const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTags: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    postImageURL: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    postVisibility: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    postStatus: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    postComments: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    categoryId: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    userId: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    postTitle: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    postBody: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    postLikes: {
        type: Number,
        required: true
    },
    cursor: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
    collection: "posts"
});

const userSchema = new Schema({
    userReports: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    userComments: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    userPosts: {
        type: [String],
        required: false,
        unique: false,
        trim: true
    },
    userRanking: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    userPermission: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    userLevel: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    userExp: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userPassword: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
}, {
    timestamps: true,
    collection: "users"
});

const reportSchema = new Schema({
    reportBody: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    reportTitle: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    commentId: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    postId: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    solved: {
        type: Boolean,
        required: false,
        unique: false
    }
}, {
    timestamps: true,
    collection: "reports"
});

const commentSchema = new Schema({
    commentReplies: {
        type: [String],
        required: false,
        unique: true,
        trim: true
    },
    commentLikes: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    commentBody: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
}, {
    timestamps: true,
    collection: "comments"
});

const categorySchema = new Schema({
    categoryTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    categoryPosts: {
        type: [String],
        required: false,
        unique: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: "categories"
});

let Post = mongoose.models.Post || mongoose.model('Post', postSchema);
let User = mongoose.models.User || mongoose.model('User', userSchema);
let Report = mongoose.models.Report || mongoose.model('Report', reportSchema);
let Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
let Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = {
    Post,
    User,
    Report,
    Comment,
    Category
};