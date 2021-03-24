export interface actorCreationDto {
    name: string;
    dateOfBirth: Date;
    picture: File;
    biography: string;
}

export interface actorDto {
    id: number;
    name: string;
    dateOfBirth: Date;
    picture: string;
    biography: string;
}

export interface actorsMovieDto {
    id: number;
    name: string;
    character: string;
    picture: string;
}