import {TEmotionRegisterModalSlice, createEmotionRegisterModalSlice} from './emotionRegisterModal.store.slice';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

type TStore = TEmotionRegisterModalSlice;

const createStore = create<TStore>()(
  devtools(
    (...set) => ({
      ...createEmotionRegisterModalSlice(...set)
    }),
    {
      name: 'emotionRegisterModalStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
);

export const useEmotionRegisterModalStore = () => createStore.getState();

export const useEmotionRegisterModalState = () => createStore((state) => state.emotionRegisterModal$);

export const useEmotionRegisterModalDispatch = () => createStore((state) => state.acToggleModal);

export const useEmotionRegisterModalSetEmotionDispatch = () => createStore((state) => state.acSetEmotion);

export const useEmotionRegisterModalSetDateDispatch = () => createStore((state) => state.acSetDate);

export const useEmotionRegisterModalSetMemoDispatch = () => createStore((state) => state.acSetMemo);

export const useEmotionRegisterModalSetTagsDispatch = () => createStore((state) => state.acSetTags);

export const useEmotionRegisterModalAddTagDispatch = () => createStore((state) => state.acAddTag);

export const useEmotionRegisterModalRemoveTagDispatch = () => createStore((state) => state.acRemoveTag);
