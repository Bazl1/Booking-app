import { IUser } from "@/types/IUser";
import { create } from "zustand";

interface IUseUserStore {
    user: IUser;
}

export const useUserStore = create<IUseUserStore>((set) => ({
    user: {} as IUser,
}));
