import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import Spinner from '../shared/Spinner';
const LogoPreview = (props) => {
    let [isOpen, setIsOpen] = useState(false);
    const [content, showContent] = useState(false);
    const cancelButtonRef = useRef();
    const close = () => {
        setIsOpen(false);
        props.closeLogoPreview();
    }

    const save = () => {
        setIsOpen(false);
        props.saveLogo();
    }
    useEffect(() => {
        setIsOpen(true);
        if (props && props.image) {
            setTimeout(() => {
                showContent(true);
            }, 1000)
        }
    }, [setIsOpen, props])
    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    open={isOpen}
                    onClose={close}
                >

                    <div className="flex items-end justify-center  h-screen p-2 pb-44 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen  sm:mt-48 "
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="inline-block  bg-white rounded-md
                               overflow-hidden shadow-xl transform transition-all
                               max-w-sm"
                            >
                                <div className="bg-white px-2 py-2 sm:flex sm:items-start">
                                    {content ?
                                        <div className="flex flex-col space-y-4">
                                            <Dialog.Title

                                                className="text-xl  tracking-wide leading-6 font-medium 
                                                            text-gray-900 w-full flex items-center"
                                            >
                                                <div className="flex w-full  items-center justify-between">
                                                    <div className='tracking-wide'>Agency Logo</div>
                                                    <button onClick={close} className='p-2 hover:bg-gray-200' ref={cancelButtonRef}>
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </Dialog.Title>
                                            <div className="mt-2 flex w-full items-center justify-between">
                                                <div className='w-3/5 shadow-md border'>
                                                    <img src={props.image} className="w-full object-contain" alt=" " />
                                                </div>
                                                <div className='w-1/3'>
                                                    <button onClick={save}
                                                        className='border-2 px-4 py-2  w-full bg-gray-800 
                                                            rounded-xl text-gray-100
                                                            tracking-wide  uppercase'>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>

                                        </div> :
                                        <div className="flex flex-col space-y-4 w-full">
                                            <Dialog.Title

                                                className="text-xl  tracking-wide leading-6 font-medium 
                                              text-gray-900 w-full flex items-center"
                                            >
                                                <div className="flex w-screen h-44 items-center justify-center">
                                                    <Spinner w='w-16' h='h-16' />
                                                </div>
                                            </Dialog.Title>
                                        </div>
                                    }
                                </div>

                            </div>
                        </Transition.Child>
                    </div>

                </Dialog>
            </Transition.Root>
        </>

    )
}

export default LogoPreview