/* eslint-disable @typescript-eslint/no-explicit-any */
export class User {
    id?: string;
    name?: string | any;
    password?: string | any;
    email?: string | any;
    phone?: string | any;
    token?: string;
    isAdmin?: true;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    country?: string;
}
