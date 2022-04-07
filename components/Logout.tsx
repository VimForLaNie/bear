import { fireAuth } from "utils/firebase";

const Logout = () => {
    return (
        <input 
            className="mdBtn hover-lightup cursor-pointer"
            type="button" 
            value="logout" 
            onClick={() => fireAuth.signOut()}
        />
    )
}

export default Logout;