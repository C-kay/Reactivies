export interface IProfile{
    displayname:string,
    username: string,
    bio: string,
    image: string,
    following: boolean,
    followersCount: number,
    followingCount: number,
    photos: IPhoto[]
}

export interface IPhoto{
    id:string,
    url:string,
    isMain:boolean
}