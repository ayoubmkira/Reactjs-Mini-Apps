import { useState, useEffect } from "react";
import "./style.css";

export default function MealsGenerator() {

    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setErrors(null);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setData(data);
        } catch (err) {
            setErrors(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleFetchClick = () => {
        fetchData(url);
    };

    const meal = data?.meals?.[0] || null;

    console.log(meal);

    return <section className="meal-section">
        <h2 className="section-title">Meal Generator</h2>
        <button className="btn-generate-meal" onClick={handleFetchClick} disabled={loading}>Generate random Meal</button>
        <div className="meal-over-container">
            {
                loading?
                    <p>On Loading ...</p>:
                errors?
                    <p>Error: { errors.message }</p>:
                meal?
                    <div className="meal-container">
                        <div className="left">
                            <img src={meal.strMealThumb} alt="Meal image" />
                        </div>
                        <div className="right">
                            <div className="meal-head">
                                <h2 className="meal-title">{meal.strMeal}</h2>
                                <h6 className="meal-category">{meal.strArea}</h6>
                            </div>
                            <div className="">
                                <h3 className="sub-title">Instructions:</h3>
                                <p className="instructions" style={{whiteSpace: "pre-wrap"}}>
                                    {meal.strInstructions}
                                </p>
                            </div>
                            <div>
                                <h3 className="sub-title">Ingredients:</h3>
                                <ul className="list-ingredients">
                                    {
                                        Object.entries(meal).filter(arr => {
                                            return arr[0].startsWith("strIngredient") && arr[1]
                                        }).map((arr, i) => {
                                            return <li key={i} className="ingredient">
                                                <span className="name">{arr[1]}</span> : <span className="measure">{data.meals[0][`strMeasure${i + 1}`]}</span>
                                            </li>;
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>: null
            }
        </div>
    </section>;

}