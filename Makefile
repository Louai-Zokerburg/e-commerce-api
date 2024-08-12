dev:
	@docker compose up --build --watch
down:
	@docker compose down
prod:
	@docker compose up --build