/*tslint:disable*/

export interface Profile {
    id: number;
    role: string | "driver" | "executor"; //TODO: Ask for possible types and create an according type
    email: string;
    name: string;
    surname: string;
    patronymic: string;
    full_name: string;
    phone: string;
}