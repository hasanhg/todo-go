package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"testing"
	"time"
	"todo-go/todo-api/auth"
	"todo-go/todo-api/database"
	"todo-go/todo-api/handler"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pact-foundation/pact-go/dsl"
	"github.com/pact-foundation/pact-go/types"
)

var (
	dir, _  = os.Getwd()
	pactDir = fmt.Sprintf("%s/../todo-client/pacts", dir)
)

func TestProvider(t *testing.T) {

	// Create Pact connecting to local Daemon
	pact := &dsl.Pact{
		Consumer: "todo-client",
		Provider: "todo-api",
	}

	// Start provider API in the background
	go _startServer()

	// Verify the Provider with local Pact Files
	pact.VerifyProvider(t, types.VerifyRequest{
		ProviderBaseURL: "http://localhost:8080",
		PactURLs:        []string{filepath.ToSlash(fmt.Sprintf("%s/todo-client-todo-api.json", pactDir))},
	})
}

func _startServer() {
	e := echo.New()
	e.HideBanner = true
	e.Use(middleware.Recover())
	e.Use(auth.DynamicCors)
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `{"time":"${time_rfc3339_nano}", "method":"${method}", "uri":"${uri}", "status":${status}, "took":"${latency_human}","bytes_in":${bytes_in},"bytes_out":${bytes_out}, "error":"${error}", "id":"${id}"}` + "\n",
	}))

	e.GET("/list", func(c echo.Context) error {
		return c.JSON(http.StatusOK, handler.ListResponse{Tasks: []*database.Task{
			{ID: uuid.New().String(), Description: "task1", CreatedAt: time.Now()},
		}})
	})
	e.POST("/create", func(c echo.Context) error {
		return c.JSON(http.StatusOK, handler.CreateResponse{Task: &database.Task{
			ID: uuid.New().String(), Description: "task1", CreatedAt: time.Now(),
		}})
	})

	e.Logger.Fatal(e.Start(":8080"))
}
