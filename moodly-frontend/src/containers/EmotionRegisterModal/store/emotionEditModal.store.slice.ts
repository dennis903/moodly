import {SlicePattern} from 'zustand';

interface IEmotionEditModalState {
  emotionEditModal$: {
    isOpen: boolean;
    emotion: string;
  };
}

interface IEmotionEditModalAction {
  acToggleModal: (payload: {isOpen: boolean}) => void;
  acSetEmotion: (payload: {emotion: string}) => void;
}

export type TEmotionEditModalSlice = IEmotionEditModalState & IEmotionEditModalAction;

enum EACTION_TYPE {
  TOGGLE_MODAL = 'acToggleModal',
  SET_EMOTION = 'acSetEmotion'
}

export const createEmotionEditModalSlice: SlicePattern<TEmotionEditModalSlice> = (set, get) => ({
  // state
  emotionEditModal$: {
    isOpen: false,
    emotion: ''
  },
  // action
  acToggleModal: (payload: {isOpen: boolean}) => {
    set(
      {
        emotionEditModal$: {
          ...get().emotionEditModal$,
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
        emotionEditModal$: {
          ...get().emotionEditModal$,
          emotion: payload.emotion
        }
      },
      false,
      EACTION_TYPE.SET_EMOTION
    );
  }
});
