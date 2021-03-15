import React from "react"

export const GardenContext = createContext()

export const GardenProvider = (props) => {
    const [gardens, setGardens] = useState([])

    const getGardens = () => {
    return fetch(`http://localhost:8088/gardens`)
    .then(res => res.json())
    .then(setGardens)
    }

    const addGardens = gardenObj => {
        return fetch("http://localhost:8088/gardens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gardenObj)
        })
        .then(getGardens)
    }

    return (
        <GardenContext.Provider value={{
            getGardens, gardens, addGardens
        }}>
            {props.children}
        </GardenContext.Provider>
    )

}