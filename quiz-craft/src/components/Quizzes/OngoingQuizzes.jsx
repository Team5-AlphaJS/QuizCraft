import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect } from "react";

const OngoingQuizzes = () => {
    const { userData } = useContext(AuthContext);
    
    useEffect(() => {
        console.log(userData);
    });
    return (<></>);
};

export default OngoingQuizzes;