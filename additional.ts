interface UserImage {
    filename: string;
    url: string;
    analysis?: Analysis;
}

interface Analysis {
    label: string;
    score: number;
}
