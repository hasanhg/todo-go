package auth

import (
	"net/url"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func DynamicCors(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var (
			allowOrigins = []string{"http://localhost:3000", "http://127.0.0.1:3000"}
			origin       = c.Request().Header.Get(echo.HeaderOrigin)
		)

		u, err := url.Parse(origin)
		if err != nil {
			return err
		}

		allowOrigin := os.Getenv("ALLOW_ORIGIN")
		if strings.HasSuffix(u.Host, allowOrigin) {
			allowOrigins = append(allowOrigins, origin)
		}

		f := middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins: allowOrigins,
		})

		return f(next)(c)
	}
}
