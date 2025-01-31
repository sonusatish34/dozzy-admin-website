

export default (req, res) => {
    if (req.method === 'POST' || req.method === 'GET') {
        const fetchCities = async () => {
            setLoading(true);
            const storedUserPhone = localStorage.getItem("tboo_user_phone");

            try {
                const response = await fetch(
                    `https://staging.dozzy.com/admin/property-cities`,

                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: localStorage.getItem(
                                "tboo_" + storedUserPhone + "_token"
                            ),
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                if (data.status === "success") {
                    setCities(data.cities);
                    // console.log(data.cities, "data.results");
                } else {
                    setError("Error: Unable to fetch data");
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
            fetchCities();
        };
    } else {
        console.log('Method Not Allowed');
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
};
