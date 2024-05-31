package graph

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

//go:generate go run github.com//99designs/gqlgen generate
type Resolver struct {
}

// Query Resolver
func (r *Resolver) Query() *queryResolver {
	return &queryResolver{r}
}

// Weather struc
type Weather struct {
	Temperature float64 `json:"temperature"`
	Description string  `json:"description"`
}

// GetWeather resolver function
func (r *queryResolver) GetWeather(ctx context.Context, city string) (*Weather, error) {
	apiKey := os.Getenv("WEATHER_API_KEY")
	resp, err := http.Get(fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric", city, apiKey))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var weatherResp struct {
		Main struct {
			Temp float64 `json:"temp"`
		} `json:"main"`
		Weather []struct {
			Description string `json:"description"`
		} `json:"weather"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&weatherResp); err != nil {
		return nil, err
	}

	return &Weather{
		Temperature: weatherResp.Main.Temp,
		Description: weatherResp.Weather[0].Description,
	}, nil
}
