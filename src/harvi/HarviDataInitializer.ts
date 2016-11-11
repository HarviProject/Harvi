import {UserModel} from "./models/UserModel";
export class HarviDataInitializer {

    async initUserAdminAsync(): Promise<void> {
        let userM = new UserModel();
        await userM.findOrCreateAsync({
            username: 'admin',
            password: 'admin',
            email: "",
            role: 'admin'
        });
    }
}