// types.ts
import { v4 as uuidv4 } from 'uuid';

export enum Enum {
    pending,
    Inprogress,
    Complete,
}

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
    cardId: string;
    cardTitle: string;
    edit: boolean;
    createTodo?: boolean;
    todos?: Todo[];
}

export interface Todo {
    todoId: string;
    name?: string;
    description?:string;
    todoItem?: TodoItem[];
}

export interface TodoItem {
    todoItemid: string;
    title: string;
    isCompleted: boolean;
    edit?: boolean;
    status?:Enum;
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