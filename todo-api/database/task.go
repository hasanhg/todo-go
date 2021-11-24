package database

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
)

const (
	taskKey = "task/%s"
)

type Task struct {
	ID          string    `json:"id"`
	CreatedAt   time.Time `json:"created_at"`
	Description string    `json:"description"`
}

func (t *Task) PreInsert() {
	if t.ID == "" {
		t.ID = uuid.New().String()
	}
	t.CreatedAt = time.Now()
}

func (t *Task) Create() error {
	t.PreInsert()

	d, err := json.Marshal(t)
	if err != nil {
		return err
	}

	key := fmt.Sprintf(taskKey, t.ID)
	return client.Set(key, string(d), 0).Err()
}

func GetTasks() ([]*Task, error) {
	tasks := []*Task{}

	pattern := fmt.Sprintf(taskKey, "*")
	keys := client.Keys(pattern).Val()
	for _, key := range keys {
		t := client.Get(key).Val()

		task := &Task{}
		err := json.Unmarshal([]byte(t), task)
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks, nil
}
