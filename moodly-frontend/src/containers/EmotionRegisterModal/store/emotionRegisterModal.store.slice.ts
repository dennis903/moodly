import {SlicePattern} from 'zustand';

interface IEmotionRegisterModalState {
  emotionRegisterModal$: {
    isOpen: boolean;
    emotion: string;
    date: string;
    memo: string;
    tags: string[];
  };
}

interface IEmotionRegisterModalAction {
  acToggleModal: (payload: {isOpen: boolean}) => void;
  acSetEmotion: (payload: {emotion: string}) => void;
  acSetDate: (payload: {date: string}) => void;
  acSetMemo: (payload: {memo: string}) => void;
  acSetTags: (payload: {tags: string[]}) => void;
  acAddTag: (payload: {tag: string}) => void;
  acRemoveTag: (payload: {tag: string}) => void;
}

export type TEmotionRegisterModalSlice = IEmotionRegisterModalState & IEmotionRegisterModalAction;

enum EACTION_TYPE {
  TOGGLE_MODAL = 'acToggleModal',
  SET_EMOTION = 'acSetEmotion',
  SET_DATE = 'acSetDate',
  SET_MEMO = 'acSetMemo',
  SET_TAGS = 'acSetTags',
  ADD_TAG = 'acAddTag',
  REMOVE_TAG = 'acRemoveTag'
}

export const createEmotionRegisterModalSlice: SlicePattern<TEmotionRegisterModalSlice> = (set, get) => ({
  // state
  emotionRegisterModal$: {
    emotion: '',
    isOpen: false,
    date: '',
    memo: '',
    tags: []
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
  },
  acSetDate: (payload: {date: string}) => {
    set(
      {
        emotionRegisterModal$: {
          ...get().emotionRegisterModal$,
          date: payload.date
        }
      },
      false,
      EACTION_TYPE.SET_DATE
    );
  },
  acSetMemo: (payload: {memo: string}) => {
    set(
      {
        emotionRegisterModal$: {
          ...get().emotionRegisterModal$,
          memo: payload.memo
        }
      },
      false,
      EACTION_TYPE.SET_MEMO
    );
  },
  acSetTags: (payload: {tags: string[]}) => {
    set(
      {
        emotionRegisterModal$: {
          ...get().emotionRegisterModal$,
          tags: payload.tags
        }
      },
      false,
      EACTION_TYPE.SET_TAGS
    );
  },
  acAddTag: (payload: {tag: string}) => {
    const tagList = get().emotionRegisterModal$.tags;
    if (tagList.includes(payload.tag)) return;

    set(
      {
        emotionRegisterModal$: {
          ...get().emotionRegisterModal$,
          tags: [...tagList, payload.tag]
        }
      },
      false,
      EACTION_TYPE.ADD_TAG
    );
  },
  acRemoveTag: (payload: {tag: string}) => {
    set(
      {
        emotionRegisterModal$: {
          ...get().emotionRegisterModal$,
          tags: get().emotionRegisterModal$.tags.filter((tag) => tag !== payload.tag)
        }
      },
      false,
      EACTION_TYPE.REMOVE_TAG
    );
  }
});
