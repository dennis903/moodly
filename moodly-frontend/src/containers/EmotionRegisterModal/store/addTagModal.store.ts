import {TAddTagModalSlice, createAddTagModalSlice} from './addTagModal.store.slice';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

type TStore = TAddTagModalSlice;

const createStore = create<TStore>()(
  devtools(
    (...set) => ({
      ...createAddTagModalSlice(...set)
    }),
    {
      name: 'addTagModalStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
);

export const useAddTagModalStore = () => createStore.getState();

export const useAddTagModalState = () => createStore((state) => state.addTagModal$);

export const useAddTagModalToggleDispatch = () => createStore((state) => state.acToggleModal);

export const useAddTagModalAddDispatch = () => createStore((state) => state.acAddTag);

export const useAddTagModalRemoveDispatch = () => createStore((state) => state.acRemoveTag);
