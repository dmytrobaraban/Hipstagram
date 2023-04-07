import { useSelector } from "react-redux"
import { userSelector } from "../store/selectors"

const useIndificate = (id) => {
    const user = useSelector(userSelector);
    return id === user?.id;
}

export default useIndificate;