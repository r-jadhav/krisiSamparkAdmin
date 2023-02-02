import React, { useState } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [category, setCategory] = useState([])
	const [subCategory, setSubCategory] = useState([])
	return (
		<AppContext.Provider
			value={{ category, setCategory, subCategory, setSubCategory }}>
			{children}
		</AppContext.Provider>
	)
}

export { AppProvider, AppContext as default }
