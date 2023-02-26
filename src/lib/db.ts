import Dexie, { type Table } from 'dexie';
import { browser } from '$app/environment';

export interface Note {
  id?: number;
  title: string;
  content: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  notes!: Table<Note>; 

  constructor() {
    super('Lactose');
    this.version(1).stores({
      notes: '++id, title, content' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();


export const newNote = async () => {
    if (browser) {
       const id = await db.notes.add({ title: 'Untitled', content: ''});
       return id;
    }
};

export const getNodeById = async (id: number) => {
    if (browser) {
        const result = await db.notes.where('id').equals(id).first();
        return result;
    }
    return null;
};

export const getAllNotes = async () => {
    if (browser) {
        const result = await db.notes.toArray();
        return result;
    }
    return [];
}

export const updateTitle = async (id: number, title: string) => {
    if (browser) {
        await db.notes.update(id, { title });
    }
};

export const updateContent = async (id: number, content: string) => {
    if (browser) {
        await db.notes.update(id, { content });
    }
};

export const deleteNote = async (id: number) => {
    if (browser) {
        await db.notes.delete(id);
    }
};