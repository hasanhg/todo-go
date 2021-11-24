package tests

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
	"todo-go/todo-api/database"
	"todo-go/todo-api/handler"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/tidwall/gjson"
)

var (
	descriptionBuyMilk   = "buy milk"
	descriptionStudyExam = "study exam"
	mockDB               = map[string]*database.Task{
		"fe1f5e39-7598-43c4-9c4e-9818792dfe92": {
			ID:          "fe1f5e39-7598-43c4-9c4e-9818792dfe92",
			CreatedAt:   parseTime("2021-11-23T23:19:41.4821943+03:00"),
			Description: descriptionBuyMilk,
		},
	}
	listJSON = fmt.Sprintf(
		`{"tasks":[{"id":"fe1f5e39-7598-43c4-9c4e-9818792dfe92","created_at":"2021-11-23T23:19:41.4821943+03:00","description":"%s"}]}`,
		descriptionBuyMilk,
	)
)

func TestList(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)
	c.SetPath("/list")

	h := handler.TaskHandler{Db: mockDB}

	if assert.NoError(t, h.List(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, listJSON, strings.TrimSuffix(rec.Body.String(), "\n"))
	}
}

func TestCreate(t *testing.T) {
	e := echo.New()

	data, err := json.Marshal(&handler.CreateRequest{Description: descriptionStudyExam})
	assert.NoError(t, err)

	req := httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer(data))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)
	c.SetPath("/create")

	h := handler.TaskHandler{Db: mockDB}

	if assert.NoError(t, h.Create(c)) {
		resp := struct {
			Task *database.Task `json:"task"`
		}{}

		err = json.Unmarshal(rec.Body.Bytes(), &resp)
		assert.NoError(t, err)

		assert.Equal(t, http.StatusOK, rec.Code)
		assert.NotNil(t, resp.Task)
		assert.Equal(t, descriptionStudyExam, resp.Task.Description)
	}
}

func TestCreateNoDescription(t *testing.T) {
	e := echo.New()

	data, err := json.Marshal(&handler.CreateRequest{})
	assert.NoError(t, err)

	req := httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer(data))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)
	c.SetPath("/create")

	h := handler.TaskHandler{Db: mockDB}

	if assert.NoError(t, h.Create(c)) {
		assert.Equal(t, http.StatusBadRequest, rec.Code)
	}
}

func TestCreateInvalidContentTypeHeader(t *testing.T) {
	e := echo.New()

	data, err := json.Marshal(&handler.CreateRequest{Description: descriptionStudyExam})
	assert.NoError(t, err)

	req := httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer(data))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationXML)
	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)
	c.SetPath("/create")

	h := handler.TaskHandler{Db: mockDB}
	if assert.NoError(t, h.Create(c)) {
		assert.Equal(t, http.StatusInternalServerError, rec.Code)
	}
}

// It will pass if the whole package test is run since mockDB is updated while creating task
func TestListAfterCreate(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)
	c.SetPath("/list")

	h := handler.TaskHandler{Db: mockDB}

	if assert.NoError(t, h.List(c)) {
		tasks := gjson.ParseBytes(rec.Body.Bytes()).Get("tasks").Array()

		assert.Equal(t, http.StatusOK, rec.Code)
		if assert.Equal(t, 2, len(tasks)) {
			assert.Equal(t, descriptionBuyMilk, tasks[0].Get("description").String())
			assert.Equal(t, descriptionStudyExam, tasks[1].Get("description").String())
		}
	}
}

func parseTime(str string) time.Time {
	t, err := time.Parse(time.RFC3339, "2021-11-23T23:19:41.4821943+03:00")
	if err != nil {
		return time.Time{}
	}
	return t
}
