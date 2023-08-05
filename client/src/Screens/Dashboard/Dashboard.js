import React, { useState, useEffect } from "react";
import HeroCard from "../../Components/HeroCard/HeroCard";
import "./styles.css";
import Button from "../../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [heroes, setHeroes] = useState([]);
  const [updateHeroes, setUpdateHeroes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUpdateHeroes("no");
    fetchHeroes();
  }, [updateHeroes]);

  const fetchHeroes = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        const headers = {
          token: `${token}`,
        };
        const response = await fetch("http://localhost:3001/init", { headers });
        const data = await response.json();
        if (data.statusCode == 200) {
          setHeroes(data.content);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };
  const handleLogOut = () => {
    sessionStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };

  return (
    <div className={`dashboard ${isLoading ? "disable-scroll" : ""}`}>
      <Button onClick={handleLogOut} label="Log out"></Button>
      <h1>Superhero Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="hero-card-list">
          {heroes.map((hero) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              className="hero-card"
              updateHeroes={setUpdateHeroes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
