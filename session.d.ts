declare module 'express-session'{
    interface SessionData{
        _id: String | Object | null;
        username: String | null;

    }
}

export {}
