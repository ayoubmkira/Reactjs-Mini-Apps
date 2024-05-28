import { useEffect, useState } from "react";
import "./style.css";

export default function JokesGenerator() {

    const url = "https://sv443.net/jokeapi/v2/joke/Programming?type=single";
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [data, setData] = useState({});

    const fetchApi = async () => {
        setLoading(true);
        setErrors(null);

        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log(data)
            
            if(data && !data.error) {
                setData(data);
            } else {
                throw new Error("Failed to fetch Joke.");
            }
        } catch (error) {
            setErrors(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchApi();
    }, []);

    console.log(errors);

    return <section className="joke-section">
        <h2 className="section-title">Joke Generator</h2>
        <div className="joke-container">
            <h2 className="joke-icon">😂</h2>
            {
                loading?
                    <h3 className="message">Joke is loading.</h3>:
                errors? <h3 className="message">Errors: {errors.message}</h3>:
                (data && !data.error)? <p className="joke">{ data.joke }</p>: null

            }
            <button className="btn-generate-joke" onClick={() => fetchApi()}>Generate a Random Joke</button>
        </div>
    </section>;

}