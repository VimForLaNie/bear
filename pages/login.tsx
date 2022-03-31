import type { NextPage } from 'next'

import Login from 'components/Login';

const page:NextPage = () => {
    return (
        <div className="flex flex-col">
            <Login></Login>
        </div>
        
    )
}

export default page;