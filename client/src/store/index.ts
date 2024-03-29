import AuthService from "@/services/AuthService";
import { IUser } from "@/types/IUser";
import { create } from "zustand";
import { toast } from "react-hot-toast";

interface IUseUserStore {
    user: IUser;
    isAuth: boolean;
    registration: (props: registrationProps) => Promise<void>;
    login: (props: loginProps) => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: IUser) => void;
}

interface loginProps {
    email: string;
    password: string;
}

interface registrationProps extends loginProps {
    name: string;
    phoneNumber: string;
}

export const useUserStore = create<IUseUserStore>((set) => ({
    user: {} as IUser,
    isAuth: false,
    setUser: (user: IUser) => {
        set((state) => ({ ...state, user: user }));
    },
    registration: async ({ name, email, phoneNumber, password }: registrationProps) => {
        try {
            const response = await AuthService.registration(name, email, phoneNumber, password);
            localStorage.setItem("token", response.data.accessToken);
            set((state) => ({ ...state, isAuth: true, user: response.data.user }));
        } catch (error: any) {
            toast.error(error.response.data.error.message);
        }
    },
    login: async ({ email, password }: loginProps) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);
            set((state) => ({ ...state, isAuth: true, user: response.data.user }));
        } catch (error: any) {
            toast.error(error.response.data.error.message);
        }
    },
    refresh: async () => {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem("token", response.data.accessToken);
            set((state) => ({ ...state, isAuth: true, user: response.data.user }));
        } catch (error) {
            console.log(error);
        }
    },
    logout: async () => {
        try {
            await AuthService.logout();
            set((state) => ({ ...state, isAuth: false, user: {} as IUser }));
        } catch (error) {
            console.log(error);
        }
    },
}));
