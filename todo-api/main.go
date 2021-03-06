package main

import (
	"log"
	"time"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"todo-go/todo-api/auth"
	"todo-go/todo-api/database"
	"todo-go/todo-api/handler"
)

func init() {
	godotenv.Load()
}

func main() {
	startServer()
}

func startServer() {
	initRedis()

	e := echo.New()
	e.HideBanner = true
	e.Use(middleware.Recover())
	e.Use(auth.DynamicCors)
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `{"time":"${time_rfc3339_nano}", "method":"${method}", "uri":"${uri}", "status":${status}, "took":"${latency_human}","bytes_in":${bytes_in},"bytes_out":${bytes_out}, "error":"${error}", "id":"${id}"}` + "\n",
	}))

	h := &handler.TaskHandler{}
	e.GET("/list", h.List)
	e.POST("/create", h.Create)

	e.Logger.Fatal(e.Start(":80"))
}

func initRedis() {
	for {
		err := database.InitRedis()
		if err != nil {
			log.Printf("Redis DB connection error: %+v, waiting 30 sec...", err)
			time.Sleep(time.Duration(30) * time.Second)
			continue
		}

		log.Printf("Connected to Redis DB")
		return
	}
}
