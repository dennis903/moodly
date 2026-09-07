import type {StateCreator, StoreMutatorIdentifier} from 'zustand';

declare module 'zustand' {
  /**
   * 슬라이스 패턴용 StateCreator 별칭
   *
   * @template TSlice 해당 슬라이스가 소유한 state + action
   * @template TStore 스토어 전체 타입 (다른 슬라이스 참조 시 명시)
   * @template Mps    적용된 미들웨어 mutator (기본: devtools)
   */
  type SlicePattern<TSlice, TStore = TSlice, Mps extends [StoreMutatorIdentifier, unknown][] = [['zustand/devtools', never]], Mcs extends [StoreMutatorIdentifier, unknown][] = []> = StateCreator<TStore, Mps, Mcs, TSlice>;

  /** devtools + persist 조합용 */
  type SlicePatternWithPersist<TSlice, TStore = TSlice> = SlicePattern<TSlice, TStore, [['zustand/devtools', never], ['zustand/persist', unknown]]>;
}
