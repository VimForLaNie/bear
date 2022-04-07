import type { NextPage } from 'next'

import Register from 'components/Register';

const page:NextPage = () => {
    return (
        <div className="flex flex-col">
            <Register></Register>
        </div>
        
    )
}

export default page;