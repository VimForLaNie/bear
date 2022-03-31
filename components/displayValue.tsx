import { useContext } from "react";
import { Ctx } from "utils/Context";

const DisplayValue = () => {

    const { currWallet } = useContext(Ctx);

    return (
        <p className=" text-3xl self-center bg-blue-300 p-4 m-2 rounded-md">
            {currWallet.name} : {currWallet?.value}
        </p>
    )
}

export default DisplayValue;