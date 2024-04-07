export interface IReview {
    id: string;
    stars: number;
    description: string;
    author: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        initials: string;
    };
}
