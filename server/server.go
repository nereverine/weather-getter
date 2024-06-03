package main

import (
	"encoding/json"
	"io/ioutil"

	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func fetchWeather(city string) (map[string]interface{}, error) {
	apiKey := os.Getenv("API_KEY")
	url := "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric"
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var jsonResponse map[string]interface{}
	if err := json.Unmarshal(body, &jsonResponse); err != nil {
		return nil, err
	}

	return jsonResponse, nil
}

func main() {
	//load the .env file in the directory above
	godotenv.Load("../.env")

	r := gin.Default()

	//ALLOW CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"}, //react app
	}))

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/pingu", func(c *gin.Context) {
		resp, err := http.Get("http://api.openweathermap.org/data/2.5/weather?q=Leiria&appid=ae5a327a7bae330964b61a4f6e736a1f&units=metric")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get data",
			})
			return
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get data",
			})
			return
		}

		c.Data(http.StatusOK, "application/json", body)
	})

	r.GET("/weathers", func(c *gin.Context) {

		cities := []string{"Lisbon", "Leiria", "Coimbra", "Porto", "Faro"}
		results := make(map[string]interface{})

		for _, city := range cities {
			data, err := fetchWeather(city)
			if err != nil {
				results[city] = map[string]string{"error": "Failed to fetch data"}
			} else {
				results[city] = data
			}
		}

		c.JSON(http.StatusOK, results)
	})

	r.GET("/weatherById/:cityId", func(c *gin.Context) {
		cityId := c.Param("cityId")
		apiKey := os.Getenv("API_KEY")
		url := ""

		switch cityId {
		case "Leiria":
			url = "https://api.openweathermap.org/data/3.0/onecall?lat=39.7437902&lon=-8.8071119&appid=" + apiKey + "&units=metric"
		case "Coimbra":
			url = "https://api.openweathermap.org/data/3.0/onecall?lat=40.2111931&lon=-8.4294632&appid=" + apiKey + "&units=metric"
		case "Faro":
			url = "https://api.openweathermap.org/data/3.0/onecall?lat=37.0162727&lon=-7.9351771&appid=" + apiKey + "&units=metric"
		case "Lisbon":
			url = "https://api.openweathermap.org/data/3.0/onecall?lat=38.7077507&lon=-9.1365919&appid=" + apiKey + "&units=metric"
		case "Porto":
			url = "https://api.openweathermap.org/data/3.0/onecall?lat=41.1494512&lon=-8.6107884&appid=" + apiKey + "&units=metric"
		default:
			url = "No weather data for that city"
		}
		resp, err := http.Get(url)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get data",
			})
			return
		}
		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get data",
			})
			return
		}

		c.Data(http.StatusOK, "application/json", body)

	})

	r.Run() // listen and serve on localhost:8080
}
