import {TEmotionEditModalSlice, createEmotionEditModalSlice} from './emotionEditModal.store.slice';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

type TStore = TEmotionEditModalSlice;

const createStore = create<TStore>()(
  devtools(
    (...set) => ({
      ...createEmotionEditModalSlice(...set)
    }),
    {
      name: 'emotionEditModalStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
);

export const useEmotionEditModalStore = () => createStore.getState();

export const useEmotionEditModalState = () => createStore((state) => state.emotionEditModal$);

export const useEmotionEditModalToggleDispatch = () => createStore((state) => state.acToggleModal);

export const useEmotionEditModalSetEmotionDispatch = () => createStore((state) => state.acSetEmotion);
