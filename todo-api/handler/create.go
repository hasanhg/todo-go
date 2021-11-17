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
	ID string `json:"id"`
}

func Create(c echo.Context) error {
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

	err = t.Create()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	resp := &CreateResponse{
		ID: t.ID,
	}

	return c.JSON(http.StatusOK, resp)
}
