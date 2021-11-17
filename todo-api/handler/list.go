package handler

import (
	"net/http"
	"todo-go/todo-api/database"

	"github.com/labstack/echo/v4"
)

type ListResponse struct {
	Tasks []*database.Task `json:"tasks"`
}

func List(c echo.Context) error {
	tasks, err := database.GetTasks()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	resp := &ListResponse{
		Tasks: tasks,
	}

	return c.JSON(http.StatusOK, resp)
}
