import React from 'react'

const Button = ({ content, px = 'px-4', py = 'py-2', w = 'w-full', text = 'text-base', type = 'button', loader = false }) => {
    return (
        <button type={type} className={`bg-gray-800 hover:bg-gray-900 rounded-xl
                         hover:shadow-xl text-gray-100 ${px} ${py} ${w} ${text} flex justify-center items-center
                         ${loader ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} 

        `}>
            {content}
        </button>
    )
}

export default Button