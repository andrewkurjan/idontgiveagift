export type Assignments = {
    assignments: Assignment[];
};

type Assignment = {
    buyer: Person;
    recipient: Person;
};

export type Person = {
    email: string;
    firstName: string;
};

export type Message = {
    to: string;
    from: {
        email: string;
        name: string;
    };
    subject: string;
    html: string;
};

export type LatestList = {
    id: number;
    userId: string;
    listName: string;
    createdAt: Date;
    submitted: boolean;
};

export type Participant = {
    firstName: string;
    email: string;
};
