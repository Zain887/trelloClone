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
    id?: number | string;
    name: string;
    description: string;
    userID?: number | string;
    createdDate?: Date;
    list?: [];
}

export interface List {
    id: number;
    listTitle: string;
    position: Enum;
    boardID: number;
    createdDate: Date;
    updatedDate: Date;
    card: [];
}

export interface Card {
    id: number;
    title: string;
    description: string;
    position: Enum;
    todo: [];
}

export interface Todo {
    id: number;
    name: string;
    position: Enum;
    todoItem: [];
}

export interface TodoItem {
    id: number;
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



/* ********************************************************* Example usage ****************************************************** */

/* const user: User = {
    id: 1,
    name: 'John Doe',
  };
  
  const board: Board = {
    id: 1,
    name: 'Project Board',
    description: 'Description of the project board',
    userID: user.id,
  };
  
  const list: List = {
    id: 1,
    listTitle: 'To Do',
    position: Enum.Pending,
    boardID: board.id,
    createdDate: new Date(),
    updatedDate: new Date(),
  };
  
  const card: Card = {
    id: 1,
    title: 'Task Card',
    description: 'Description of the task card',
    position: Enum.InProgress,
    todos: [
      {
        id: 1,
        name: 'Task 1',
        position: Enum.Pending,
        todoItems: [
          {
            id: 1,
            title: 'Subtask 1',
            isCompleted: false,
          },
        ],
      },
    ],
  };
  
  const comment: Comment = {
    id: 1,
    description: 'A comment on a card',
    cardID: card.id,
    memberID: user.id,
  };
  
  const attachment: Attachment = {
    id: 1,
  };
  
  const boardMember: BoardMember = {
    id: 1,
    memberID: user.id,
    boardID: board.id,
  };
  
  const cardMember: CardMember = {
    id: 1,
    cardID: card.id,
    memberID: user.id,
  }; */