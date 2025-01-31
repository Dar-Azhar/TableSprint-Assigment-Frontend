import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ to, text }) => {
    return (
        <Link to={to} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-center block sm:inline-block
                 w-full sm:w-auto transition-all duration-300 ease-in-out">
            {text}
        </Link>
    )
}

export default Button