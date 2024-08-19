import { fetchUserInfo } from "@/apis/mock";
import type { Mock } from "@/apis/mock/typings";
import type { StateCreator } from "zustand";

export type UserSliceType = {
  currentUser?: Mock.UserInfo;
  getCurrentUserInfo: () => Promise<void>;
  resetUserState: () => void;
};

const userSlice: StateCreator<
  UserSliceType,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => ({
  getCurrentUserInfo: async () => {
    const { data } = await fetchUserInfo();
    set({ currentUser: data });
  },
  resetUserState: () => {
    set(() => ({
      currentUser: undefined,
    }));
  },
});
export default userSlice;
