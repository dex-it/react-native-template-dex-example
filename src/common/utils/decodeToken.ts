import jwtDecode from "jwt-decode";
import _ from "lodash";

export const decodeToken = _.memoize(
    (token: string): ITokenOptions => {
        const decoded = jwtDecode(token);

        return {
            userId: decoded.userId,
            email: decoded.Email,
            name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            teamId: decoded.teamId
        };
    }
);

interface ITokenOptions {
    userId: string;
    email: string;
    name: string;
    role: string;
    teamId: string;
}
