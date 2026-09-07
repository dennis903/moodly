import {SlicePattern} from 'zustand';

interface IEmotionRegisterModalState {
  emotionRegisterModal$: {
    isOpen: boolean;
    emotion: string;
  };
}

interface IEmotionRegisterModalAction {
  acToggleModal: (payload: {isOpen: boolean}) => void;
  acSetEmotion: (payload: {emotion: string}) => void;
}

export type TEmotionRegisterModalSlice = IEmotionRegisterModalState & IEmotionRegisterModalAction;

enum EACTION_TYPE {
  TOGGLE_MODAL = 'acToggleModal',
  SET_EMOTION = 'acSetEmotion'
}

export const createEmotionRegisterModalSlice: SlicePattern<TEmotionRegisterModalSlice> = (set, get) => ({
  // state
  emotionRegisterModal$: {
    emotion: '',
    isOpen: false
  },

  // action
  acToggleModal: (payload: {isOpen: boolean}) => {
    set(
      {
        emotionRegisterModal$: {
          ...get().emotionRegisterModal$,
          isOpen: payload.isOpen
        }
      },
      false,
      EACTION_TYPE.TOGGLE_MODAL
    );
  },
  acSetEmotion: (payload: {emotion: string}) => {
    set(
      {
        emotionRegisterModal$: {
          ...get().emotionRegisterModal$,
          emotion: payload.emotion
        }
      },
      false,
      EACTION_TYPE.SET_EMOTION
    );
  }
});
