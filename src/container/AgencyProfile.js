import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import HttpService from '../services/HttpService';
import { useNavigate } from 'react-router-dom';
import LogoPreview from '../components/LogoPreview';
import Button from '../shared/Button';
import { LoaderContext } from '../shared/context/loader-context';

const AgencyProfile = () => {
    const { loader, setLoader } = useContext(LoaderContext)
    const navigate = useNavigate();
    useEffect(() => {
        const agent_user = localStorage.getItem('agent_user') !== 'undefined' ? JSON.parse(localStorage.getItem('agent_user')) : localStorage.clear();
        if (!agent_user) navigate('/login');

    }, [navigate]);


    const http = new HttpService();
    const [email, setEmail] = useState("");
    const [agency, setAgency] = useState("");
    const [phone_no1, setPhone_no1] = useState("");
    const [phone_no2, setPhone_no2] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [logo, setLogo] = useState("");
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState();

    const [logoMissing, setLogoMissing] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();


    const onSubmit = data => {
        setLoader(true);
        console.log(data);
        let url = "save-agency";
        http.post(url, data).then(response => {
            if (response) {
                setTimeout(() => {
                    setLoader(false);
                }, 1000)

                // If logo is absent throw an error, else move on to Home.. 
                if (logo === '') {
                    setLogoMissing(true);
                } else {
                    navigate('/');
                }
            }

        }).catch(err => {
            console.log(err);
            setLoader(false);
        })
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    const closeLogoPreview = () => {
        setLoader(false);
        setSelectedFile(undefined);
        setPreview(undefined);
    }

    const saveLogo = () => {
        setLoader(true);
        const sum = new FormData();
        sum.append("logo", selectedFile);
        let url = "upload-agency-logo";
        http.post(url, sum).then(response => {
            setLogoMissing(false);
            if (response) {
                setTimeout(() => {
                    setLoader(false);
                    setLogo(preview);
                    // If agency is present then surely everything required is fix, therefore move to Home..
                    if (agency) {
                        navigate('/');
                    }
                }, 1000)
            }
        }).catch(err => {
            setLoader(false);

        })
        setSelectedFile(undefined);
        setPreview(undefined);
    }

    useEffect(() => {


        const http = new HttpService();
        let url = "me";
        let data = {};
        http.post(url, data).then(response => {
            setLoader(true);
            if (response && response.agent) {
                const { agent } = response;
                setEmail(response.email);

                // If it 'x' it is required.. 
                Object.keys(agent).forEach(a => {
                    if (agent[a] === "x" || agent[a] === null) {
                        agent[a] = "";
                    }
                })


                const { agency, phone_no1, phone_no2, description, address, logo } = agent;
                setAgency(agency); setPhone_no1(phone_no1); setPhone_no2(phone_no2);
                setDescription(description); setAddress(address);
                console.log(logo);
                if (logo !== '') {
                    //This will later be changed to effect with domain.. 
                    setLogo(`http://localhost:8000/uploads/${logo}`);
                }


                setTimeout(() => {
                    setLoader(false)
                }, 1000)

                if (!selectedFile) {
                    setPreview(undefined)
                    return
                }
                const objectUrl = URL.createObjectURL(selectedFile)
                setPreview(objectUrl)



                return () => URL.revokeObjectURL(objectUrl)

            }
        });


    }, [setEmail, setAgency, setPhone_no1, setPhone_no2, setDescription, setAddress, selectedFile, setLoader])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <main className='relative profile  '>
                    <nav className='bg-gray-100  p-2 sm:p-4 flex justify-center items-center tracking-widest'>
                        Ileya
                    </nav>
                    <div className='flex justify-center px-4'>
                        <div className="w-full  max-w-5xl" autoComplete='off'>
                            {/* <h3 className='text-2xl my-6'>
                                Few content are needed from you.
                            </h3> */}
                            <div className="flex flex-wrap mt-4 -mx-3 my-3">

                                <div className="w-full md:w-1/4 px-2 sm:px-3 my-3">
                                    <label className="profile-label required" htmlFor="agency" >
                                        Agency Brand Name
                                    </label>
                                    <input className={`profile-input ${errors.agency ? 'border-red-600' : ''}`}
                                        {...register('agency', { required: true, onChange: e => setAgency(e.target.value) })}
                                        {...setValue('agency', agency)} type="text" placeholder="Sabelo Property Service" />
                                    {errors.agency && <small className='text-red-700 tracking-wider'>We need your agency brand name.</small>}
                                </div>

                                <div className="w-full md:w-1/4 px-2 sm:px-3 my-3">
                                    <label className="profile-label required" htmlFor="email" >
                                        Email Address
                                    </label>
                                    <input className={`profile-input ${errors.email ? 'border-red-600' : ''}`}
                                        {...register('email', { required: true, onChange: e => setEmail(e.target.value) })}
                                        {...setValue('email', email)} type="text" placeholder="ileya@gmail.com" />
                                    {errors.email && <small className='text-red-700 tracking-wider'>Email address is very important.</small>}
                                </div>

                                <div className="w-full md:w-1/4 px-2 sm:px-3  my-3">
                                    <label className="profile-label required" htmlFor="phone_no1">
                                        Phone Number 1
                                    </label>
                                    <input className={`profile-input ${errors.phone_no1 ? 'border-red-600' : ''}`}
                                        {...register('phone_no1', { required: true, onChange: e => setPhone_no1(e.target.value) })}
                                        {...setValue('phone_no1', phone_no1)} type="number" autoComplete='phone_1' placeholder="07014811757" />
                                    {errors.phone_no1 && <small className='text-red-700 tracking-wider'>We need your main phone no.</small>}
                                </div>

                                <div className="w-full md:w-1/4 px-2 sm:px-3  my-3">
                                    <label className="profile-label" htmlFor="phone_no2">
                                        Phone Number 2
                                    </label>
                                    <input className="profile-input"  {...register('phone_no2', { onChange: e => setPhone_no2(e.target.value) })}
                                        {...setValue('phone_no2', phone_no2)} type="number" autoComplete='phone_2' placeholder="08151841023" />
                                </div>




                                <div className='w-full md:w-9/12 px-2 sm:px-3 '>
                                    <div className="w-full my-3">
                                        <label className="profile-label required" htmlFor="description">
                                            What do you want people to know about your agency?
                                        </label>
                                        <textarea className={`profile-input ${errors.description ? 'border-red-600' : ''}`}
                                            {...setValue('description', description)}   {...register('description', { required: true, minLength: 50, onChange: e => setDescription(e.target.value) })}
                                            rows="4" type="text" placeholder="We possess the best customer support when you are looking for homes." />
                                        {errors.description && <small className='text-red-700 tracking-wider'>At least 50 characters. </small>}

                                    </div>

                                    <div className="w-full  my-3">
                                        <label className="profile-label required" htmlFor="address">
                                            Address of Agency
                                        </label>
                                        <textarea className={`profile-input ${errors.address ? 'border-red-600' : ''}`}
                                            {...setValue('address', address)}  {...register('address', { required: true, minLength: 6, onChange: e => setAddress(e.target.value) })}
                                            rows="4" type="text" placeholder="12 Landbridge Ave, Oniru Palace Estate, Lagos State." />
                                        {errors.address && <small className='text-red-700 tracking-wider'>We need your agency address. *min 2words.</small>}

                                    </div>

                                </div>
                                <div className="w-full md:w-3/12 mx-3 sm:mx-0 my-3 border shadow p-2">
                                    <div className='tracking-wider p-2 font-medium'>AGENCY LOGO</div>
                                    <div className='flex space-x-4 p-2'>
                                        <div className='w-1/2 shadow-sm border'>
                                            {logo &&
                                                <img
                                                    src={logo} alt=" "
                                                    className='object-contain' />
                                            }

                                            <input
                                                onChange={onSelectFile}
                                                type="file"
                                                name="logo"
                                                id='logo'
                                                multiple
                                                className="hidden"
                                                accept=".jpg,.jpeg,.gif,.png"
                                            />
                                        </div>
                                        <div>
                                            <button className='bg-gray-800 text-white text-xl no-wrap 
                                             tracking-wider   rounded-xl px-4 py-2' type='button'
                                                onClick={() => (document.getElementById('logo').click())}>
                                                Upload <span className='sm:hidden'>Logo</span>
                                            </button>
                                        </div>
                                    </div>
                                    {logoMissing &&
                                        <p className='font-semibold uppercase text-red-700 mt-2'>
                                            We need your agency Logo
                                        </p>
                                    }

                                    <div className='p-2'>
                                        {selectedFile &&
                                            <LogoPreview image={preview}
                                                closeLogoPreview={closeLogoPreview}
                                                saveLogo={saveLogo}
                                            />
                                        }


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </main>
                <footer className='fixed bottom-0 flex right-0 left-0 flex justify-center sm:mb-6
                            sm:py-2  bg-white'>
                    <div className='flex flex-wrap w-full  sm:max-w-5xl p-2 sm:p-0 items-center'>
                        <div className='w-full sm:w-1/2'>
                            <Button type="submit" content="Continue" px="px-4" py="py-2" w="w-1/2" text='text-xl sm:text-2xl'
                                loader={loader} />
                        </div>

                    </div>
                </footer>

            </form>


        </>
    );
}

export default AgencyProfile

















































































































































