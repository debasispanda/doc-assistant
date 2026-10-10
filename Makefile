format-server:
	ruff check server --fix

start-server:
	uv run fastapi dev server/main.py

start-client:
	npm run dev
