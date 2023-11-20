export async function getCities() {
    const res = await fetch('http://localhost:5282/api/City')
    
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    // await new Promise(resolve => setTimeout(resolve, 10000)); // Timeout for 5 seconds

    console.info('return cities')
    return res.json()
}