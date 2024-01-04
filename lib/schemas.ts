import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  fileUrl: z.string({
    required_error: "Please upload a file",
  }).url(),
  caption: z.string().optional(),
});

export const CreatePost = PostSchema.omit({ id: true });
export const UpdatePost = PostSchema;
export const DeletePost = PostSchema.pick({ id: true });

export const LikeSchema = z.object({
  postId: z.string(),
});

export const BookmarkSchema = z.object({
  postId: z.string(),
});

export const CommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  postId: z.string(),
});

export const CreateComment = CommentSchema.omit({ id: true });
export const UpdateComment = CommentSchema;
export const DeleteComment = CommentSchema.pick({ id: true });

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  displayName: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().max(150).optional(),
  // phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
  //   message: 'Invalid phone number format',
  // })
  phone:z
    .string()
    .refine((value) => /^\+880\s[0-9]{10}$/g.test(value), {
      message:
        "Please enter a valid Bangladesh mobile number starting with +8801.",
    }),
});

export const UpdateUser = UserSchema;
export const DeleteUser = UserSchema.pick({ id: true });
export const FollowUser = UserSchema.pick({ id: true });
