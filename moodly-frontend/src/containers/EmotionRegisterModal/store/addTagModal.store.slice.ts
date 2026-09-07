import {SlicePattern} from 'zustand';

interface IAddTagModalState {
  addTagModal$: {
    isOpen: boolean;
    tagList: string[];
  };
}

interface IAddTagModalAction {
  acToggleModal: (payload: {isOpen: boolean}) => void;
  acAddTag: (payload: {tag: string}) => void;
  acRemoveTag: (payload: {tag: string}) => void;
}

export type TAddTagModalSlice = IAddTagModalState & IAddTagModalAction;

enum EACTION_TYPE {
  TOGGLE_MODAL = 'acToggleModal',
  ADD_TAG = 'acAddTag',
  REMOVE_TAG = 'acRemoveTag'
}

export const createAddTagModalSlice: SlicePattern<TAddTagModalSlice> = (set, get) => ({
  // state
  addTagModal$: {
    isOpen: false,
    tagList: []
  },

  // action
  acToggleModal: (payload: {isOpen: boolean}) => {
    set(
      {
        addTagModal$: {
          ...get().addTagModal$,
          isOpen: payload.isOpen
        }
      },

      false,
      EACTION_TYPE.TOGGLE_MODAL
    );
  },
  acAddTag: (payload: {tag: string}) => {
    set(
      {
        addTagModal$: {
          ...get().addTagModal$,
          tagList: [...get().addTagModal$.tagList, payload.tag]
        }
      },
      false,
      EACTION_TYPE.ADD_TAG
    );
  },
  acRemoveTag: (payload: {tag: string}) => {
    set(
      {
        addTagModal$: {
          ...get().addTagModal$,
          tagList: get().addTagModal$.tagList.filter((tag) => tag !== payload.tag)
        }
      },
      false,
      EACTION_TYPE.REMOVE_TAG
    );
  }
});
