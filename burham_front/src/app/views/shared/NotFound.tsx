import { useNavigate } from "react-router-dom"

export const NotFound = () => {
    const goBack = useNavigate();
    return (
        <div>
            <p>This post has been taken by the undefined gang</p>
            <p>Share if you also zznggansg</p>
            <button onClick={() => goBack(-1)}><p>Define</p></button>
        </div>
    )
}