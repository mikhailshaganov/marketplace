import jwtDecode from 'jwt-decode';
import { ResponseStatus } from "../../Constant/ResponseStatus"

const userRequestUrl: string = '/account/authMe';
const userSignOutUrl: string = '/account/signout';

export default async function AuthMe() {
    let userResponce = await fetch(userRequestUrl);
    let userData = await userResponce.json();

    if (userData.StatusCode === ResponseStatus.UNAUTHORIZED) {
        window.location.href = "/account/google-login";
    }

    return userData;
}

export function GetUserName(jwtToken: string) {
    let decodeData: any = jwtDecode(jwtToken);
    return decodeData["UserName"] || "";
}

export async function SignOut() {
    await fetch(userSignOutUrl);
}