import $Api from "@/shared/utils/axios";
import { AuthResponse } from "@/types/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
    static registration(
        name: string,
        email: string,
        phoneNumber: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $Api.post<AuthResponse>("/auth/register", { name, email, phoneNumber, password });
    }

    static login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $Api.post<AuthResponse>("/auth/login", { email, password });
    }

    static refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $Api.post<AuthResponse>("/auth/refresh");
    }

    static logout(): Promise<AxiosResponse<void>> {
        return $Api.post<void>("/auth/logout");
    }
}
