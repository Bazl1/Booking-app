import AuthService from "@/services/AuthService";
import { IUser } from "@/types/IUser";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import { IAmenities } from "@/shared/utils/amenitiesState";
import ProductsService from "@/services/ProductsService";

interface IUseUserStore {
    user: IUser;
    isAuth: boolean;
    registration: (props: registrationProps) => Promise<void>;
    login: (props: loginProps) => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: IUser) => void;
}

interface IUseCalendarStore {
    currentMonth: number;
    setMonth: (month: number) => void;
}

interface loginProps {
    email: string;
    password: string;
}

interface registrationProps extends loginProps {
    name: string;
    phoneNumber: string;
}

interface IuseFilterStore {
    query: string | null;
    startDate: string | null;
    endDate: string | null;
    category: string | null;
    minCost: number | null;
    maxCost: number | null;
    singleBeds: number | null;
    doubleBeds: number | null;
    amenities: IAmenities[] | null;
    setQuery: (value: string) => void;
    setStartDate: (value: string | null) => void;
    setEndDate: (value: string | null) => void;
    setCategory: (value: string | null) => void;
    setMinCost: (value: number | null) => void;
    setMaxCost: (value: number | null) => void;
    setSingleBeds: (value: number | null) => void;
    setDoubleBeds: (value: number | null) => void;
    setAmenities: (value: IAmenities[] | null) => void;
    search: () => any;
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
            localStorage.removeItem("token");
        } catch (error) {
            console.log(error);
        }
    },
}));

export const useCalendarStore = create<IUseCalendarStore>((set) => ({
    currentMonth: dayjs().month(),
    setMonth: (month: number) => {
        set((state) => ({ ...state, currentMonth: month }));
    },
}));

export const useBigCalendarStore = create<IUseCalendarStore>((set) => ({
    currentMonth: dayjs().month(),
    setMonth: (month: number) => {
        set((state) => ({ ...state, currentMonth: month }));
    },
}));

export const useFilterStore = create<IuseFilterStore>((set, get) => ({
    query: null,
    startDate: null,
    endDate: null,
    category: "Cabins",
    minCost: null,
    maxCost: null,
    singleBeds: null,
    doubleBeds: null,
    amenities: null,
    setQuery: (value) => {
        set((state) => ({ ...state, query: value }));
    },
    setStartDate: (value) => {
        set((state) => ({ ...state, startDate: value }));
    },
    setEndDate: (value) => {
        set((state) => ({ ...state, endDate: value }));
    },
    setCategory: (value) => {
        set((state) => ({ ...state, category: value }));
    },
    setMinCost: (value) => {
        set((state) => ({ ...state, minCost: value }));
    },
    setMaxCost: (value) => {
        set((state) => ({ ...state, maxCost: value }));
    },
    setSingleBeds: (value) => {
        set((state) => ({ ...state, singleBeds: value }));
    },
    setDoubleBeds: (value) => {
        set((state) => ({ ...state, doubleBeds: value }));
    },
    setAmenities: (value) => {
        set((state) => ({ ...state, amenities: value }));
    },
    search: async () => {
        try {
            const state = get();
            const params = new Map<string, any>();

            Object.entries(state).forEach(([key, value]) => {
                if (typeof value !== "function" && value !== null && key !== "amenities") {
                    params.set(key, value.toString());
                }
            });

            if (state.amenities) {
                state.amenities.forEach((amenity) => {
                    if (amenity.value === true) {
                        params.set(amenity.name, "true");
                    }
                });
            }

            const response = await ProductsService.getFilteredProduct(params);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
}));
