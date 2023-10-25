// types.ts
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: number;
    userid: number;
    name: string;
}

export interface Member {
    id: string;
    email?: string;
    desigination?: string;
}

export interface BoradMember {
    id: number;
    memberID: number;
    boardID: number;
}

export interface CardMember {
    id: number;
    cardID: number;
    memberID: number;
}

export interface Board {
    id: string
    title?: string;
    createdDate?: Date;
    list?: List[];
}

export interface List {
    id?: string
    title?: string;
    edit?: boolean;
    createdDate?: Date;
    updatedDate?: Date;
    card?: Card[];
}

export interface Card {
    id: string;
    title: string;
    description: string;
    edit: boolean;
    createTodo?: boolean;
    todos?: Todo[];
}

export interface Todo {
    id: string;
    title?: string;
    todoitem?:TodoItem[];
}

export interface TodoItem {
    id: string;
    text: string;
    status: string;
    comments?: Comment[];
}

export interface Comment {
    id: string;
    description: string;
    cardID: string;
    memberID: string;
}

export interface Attechment {
    id: number;
}

export function generateUUID(): string {
    return uuidv4();
}