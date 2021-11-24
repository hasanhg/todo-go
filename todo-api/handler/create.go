package handler

import (
	"net/http"
	"strings"
	"todo-go/todo-api/database"

	"github.com/labstack/echo/v4"
)

const (
	ErrEmptyDescription = "Description is empty"
)

type CreateRequest struct {
	Description string `json:"description"`
}

type CreateResponse struct {
	Task *database.Task `json:"task"`
}

func (h *TaskHandler) Create(c echo.Context) error {
	var (
		req CreateRequest
	)

	err := c.Bind(&req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if strings.TrimSpace(req.Description) == "" {
		return c.JSON(http.StatusBadRequest, ErrEmptyDescription)
	}

	t := &database.Task{
		Description: req.Description,
	}

	// If we use in-memory DB, just insert it to the map.
	// It is probably test environment.
	if h.Db != nil {
		t.PreInsert()
		// We should use mutex here in order to
		// prevent concurrent map writing.
		h.m.Lock()
		h.Db[t.ID] = t
		h.m.Unlock()

	} else {
		err = t.Create()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}
	}

	resp := &CreateResponse{
		Task: t,
	}

	return c.JSON(http.StatusOK, resp)
}
