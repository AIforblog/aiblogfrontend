/**
 * Interface representing the metrics of a user post.
 */
export interface PostMetrics {
  /** The number of likes the post has received */
  likesCount: number;

  /** The number of comments on the post */
  commentsCount: number;

  /** The number of shares of the post */
  sharesCount: number;

  /** Indicates whether the post is liked by the current user */
  isLiked?: boolean;
}
