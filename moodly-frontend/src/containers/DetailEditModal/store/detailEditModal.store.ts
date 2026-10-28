import {TDetailEditModalSlice, createDetailEditModalSlice} from './detailEditModal.store.slice';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

type TStore = TDetailEditModalSlice;

const createStore = create<TStore>()(
  devtools(
    (...set) => ({
      ...createDetailEditModalSlice(...set)
    }),
    {
      name: 'detailEditModalStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
);

export const useDetailEditModalStore = () => createStore.getState();

export const useDetailEditModalState = () => createStore((state) => state.detailEditModal$);

export const useDetailEditModalToggleDispatch = () => createStore((state) => state.acToggleModal);
