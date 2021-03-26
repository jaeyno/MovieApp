export interface userCredentials {
    email: string;
    password: string;
}

export interface authenticationResponse {
    token: string;
    expiration: Date;
}

export interface userDto {
    id: string;
    email: string;
}