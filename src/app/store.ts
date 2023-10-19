import { notes as DBNotes } from '@prisma/client';
import { create } from 'zustand';

type NoteStore = {
  notes: DBNotes[];
  fetchNotes: () => Promise<void>;
  fetchNote: (id: number) => Promise<DBNotes | undefined>;
  addNote: (note: { title: string; content: string }) => Promise<DBNotes>;
  updateNote: (
    id: number,
    note: {
      title: string;
      content: string;
    }
  ) => Promise<DBNotes>;
  replaceOrAddToStore: (id: number, note: DBNotes) => void;
  removeNote: (id: number) => Promise<void>;
  getById: (id: number) => DBNotes | undefined;
};

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  getById: (id: number) => {
    const note = get().notes.find((n) => n.id === id);
    return note;
  },
  fetchNotes: async () => {
    const res = await fetch('/api/notes');
    const notes = await res.json();
    set({ notes: notes.data });
  },
  fetchNote: async (id) => {
    const res = await fetch(`/api/notes/${id}`);
    const { data: note } = await res.json();
    get().replaceOrAddToStore(id, note);
    return note;
  },
  addNote: async (note) => {
    const res = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data: newNote } = await res.json();
    get().replaceOrAddToStore(newNote.id, newNote);
    return newNote;
  },
  replaceOrAddToStore: (id, note) => {
    const isInStore = get().notes.some((n) => n.id === id);

    if (isInStore) {
      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? note : n)),
      }));
    } else {
      set((state) => ({
        notes: [...state.notes, note],
      }));
    }
  },
  updateNote: async (id, note) => {
    const old = get().getById(id)!;
    try {
      get().replaceOrAddToStore(id, old);
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data: updatedNote } = await res.json();
      get().replaceOrAddToStore(id, updatedNote);
      return updatedNote;
    } catch (e) {
      get().replaceOrAddToStore(id, old);
      throw e;
    }
  },
  removeNote: async (id) => {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    }));
  },
}));
