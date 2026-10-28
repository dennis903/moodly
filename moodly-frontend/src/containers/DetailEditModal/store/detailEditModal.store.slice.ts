import {SlicePattern} from 'zustand';

interface IDetailEditModalState {
  detailEditModal$: {
    isOpen: boolean;
  };
}

interface IDetailEditModalAction {
  acToggleModal: (payload: {isOpen: boolean}) => void;
}

export type TDetailEditModalSlice = IDetailEditModalState & IDetailEditModalAction;

enum EACTION_TYPE {
  TOGGLE_MODAL = 'acToggleModal'
}

export const createDetailEditModalSlice: SlicePattern<TDetailEditModalSlice> = (set, get) => ({
  // state
  detailEditModal$: {
    isOpen: false
  },

  // action
  acToggleModal: (payload: {isOpen: boolean}) => {
    set(
      {
        detailEditModal$: {
          ...get().detailEditModal$,
          isOpen: payload.isOpen
        }
      },
      false,
      EACTION_TYPE.TOGGLE_MODAL
    );
  }
});
