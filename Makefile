.PHONY: help dev down prod

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'

dev: ## Start development environment with Docker Compose
	@docker compose up --build --watch

down: ## Stop and remove Docker Compose services
	@docker compose down

prod: ## Start production environment with Docker Compose
	@docker compose up --build
