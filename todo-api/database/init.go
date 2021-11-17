package database

import (
	"fmt"
	"log"
	"os"

	"github.com/go-redis/redis"
)

var (
	client *redis.Client
)

func InitRedis() error {

	redisHost := os.Getenv("REDIS_HOST")
	if redisHost == "" {
		log.Fatal("REDIS_HOST env variable is empty")
	}

	redisPort := os.Getenv("REDIS_PORT")
	if redisPort == "" {
		log.Fatal("REDIS_PORT env variable is empty")
	}

	redisPassword := os.Getenv("REDIS_PASSWORD")

	redisScheme := os.Getenv("REDIS_SCHEME")
	if redisScheme == "" {
		redisScheme = "redis"
	}

	connStr := fmt.Sprintf("%s://default:%s@%s:%s", redisScheme, redisPassword, redisHost, redisPort)
	opts, err := redis.ParseURL(connStr)
	if err != nil {
		return err
	}

	client = redis.NewClient(opts)
	_, err = client.Ping().Result()

	return err
}
