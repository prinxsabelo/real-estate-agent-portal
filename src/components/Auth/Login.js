import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../services/AuthService';

const Login = () => {

    const [googleUrl, setGoogleUrl] = useState("");
    useEffect(() => {
        const auth = new AuthService();
        auth.sendRequest("login/google").then(response => {
            setGoogleUrl(response.url);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className=" relative w-full h-full bg-gray-200 ">
                {/* <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                /> */}
                {/* bg-blackOverlay */}
                <div className="absolute flex flex-col justify-center items-center top-0 
                                right-0 left-0 bottom-0  ">
                    <div className="p-5 uppercase">
                        Run Your Homes with ileya *Agents
                    </div>
                    <div>
                        {googleUrl && (
                            <a className="border-2 shadow-md p-4 font-semibold
                         tracking-widest flex items-center space-x-2" href={googleUrl} >
                                <FcGoogle size={25} />
                                <span> Continue with Google</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login