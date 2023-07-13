import { LeftMenu } from "./LeftMenu";
import { UpperMenu } from "./UpperMenu";
import { HomeRouting } from "../utils/routes/HomeRouting";

export const MainBoard = () => {
    return (
        <div>
            <UpperMenu/>
            <LeftMenu/>
            <HomeRouting/>
        </div>
    )
}