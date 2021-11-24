package handler

import (
	"net/http"
	"sort"
	"todo-go/todo-api/database"

	"github.com/labstack/echo/v4"
)

type ListResponse struct {
	Tasks []*database.Task `json:"tasks"`
}

func (h *TaskHandler) List(c echo.Context) error {
	var (
		err  error
		resp = &ListResponse{}
	)

	if h.Db != nil {
		// RLock will be enough here since concurrent
		// map reading is allowed.
		h.m.RLock()
		for _, t := range h.Db {
			resp.Tasks = append(resp.Tasks, t)
		}
		h.m.RUnlock()
		sort.Slice(resp.Tasks, func(i, j int) bool {
			return resp.Tasks[i].CreatedAt.Before(resp.Tasks[j].CreatedAt)
		})

	} else {
		resp.Tasks, err = database.GetTasks()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}
	}

	return c.JSON(http.StatusOK, resp)
}
