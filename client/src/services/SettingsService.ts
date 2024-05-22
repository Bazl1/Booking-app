import $Api from "@/shared/utils/axios";
import { IUser } from "@/types/IUser";
import { AxiosResponse } from "axios";

export default class SettingsService {
    static globalSettings(data: FormData): Promise<AxiosResponse<IUser>> {
        return $Api.put<IUser>("/accounts", data);
    }

    static securitySettings(password: string, newPassword: string): Promise<void> {
        return $Api.put("/accounts/change-password", { password, newPassword });
    }
}
