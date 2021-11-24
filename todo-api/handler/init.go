package handler

import (
	"sync"
	"todo-go/todo-api/database"
)

type TaskHandler struct {
	Db map[string]*database.Task
	m  sync.RWMutex
}
