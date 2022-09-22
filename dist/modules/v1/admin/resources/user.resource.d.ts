import { Model } from 'mongoose';
import { ActionRequest } from 'adminjs';
import { User } from '@v1/users/schemas/users.schema';
import { RolesEnum } from '@decorators/roles.decorator';
declare const _default: (userModel: Model<User>) => {
    resource: Model<User, {}, {}>;
    options: {
        properties: {
            password: {
                isVisible: boolean;
            };
            setPassword: {
                isVisible: {
                    list: boolean;
                    edit: boolean;
                    filter: boolean;
                    show: boolean;
                };
            };
            verified: {
                isRequired: boolean;
            };
            roles: {
                availableValues: {
                    label: RolesEnum;
                    value: RolesEnum;
                }[];
            };
        };
        actions: {
            new: {
                before: (request: ActionRequest) => Promise<ActionRequest>;
            };
            edit: {
                before: (request: ActionRequest) => Promise<ActionRequest>;
            };
        };
    };
    features: import("adminjs").FeatureType[];
};
export default _default;
