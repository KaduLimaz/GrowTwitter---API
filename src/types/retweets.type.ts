import {TweetType} from "../types/tweet.types"

export interface CreateRetweetType {
  content: string;
  tweetType: TweetType;
  userId: string;
  tweetId: string;
}

export interface UpdateRetweetType {
  id: string;
  content: string;
  userId: string;
  tweetId: string
}

