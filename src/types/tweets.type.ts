import {TweetType} from "../types/tweet.types"

export interface CreateTweetType {
    content: string
    tweetType: TweetType
    userId: string
}

export interface UpdateTweetType{
    id: string
    content?: string
    userId: string
}

