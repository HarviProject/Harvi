import {UserModel, UserSchema} from "./models/UserModel";
export class HarviDataInitializer {

    async initUserAdminAsync(): Promise<UserSchema> {
        let userM = new UserModel();
        return await userM.findOrCreateAsync({
            username: 'admin',
            password: 'admin',
            email: "",
            role: 'admin'
        });
    }
}