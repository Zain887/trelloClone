// types.ts
import { v4 as uuidv4 } from 'uuid';

enum Enum {
    pandding,
    Inprogress,
    Complete,
}

export interface User {
    id: number;
    userid: number;
    name: string;
}

export interface Member {
    id: number;
    name: string;
    desigination: string;
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
    name: string;
    createdDate?: Date;
    list?: [];
}

export interface List {
    listId: string
    listTitle: string;
    edit: boolean;
    createdDate?: Date;
    updatedDate?: Date;
    card?: [];
}

export interface Card {
    cardId: string;
    cardTitle: string;
    todo: [];
}

export interface Todo {
    todoId: string;
    name: string;
    todoItem?: [];
}

export interface TodoItem {
    todoItemid: string;
    title: string;
    isCompleted: boolean;
}

export interface Comment {
    id: number;
    description: string;
    cardID: number;
    memberID: number;
}

export interface Attechment {
    id: number;
}

export function generateUUID(): string {
    return uuidv4();
}