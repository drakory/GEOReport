FROM golang:1.22-alpine
ENV GIN_MODE=release
ENV PORT=3000

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE $PORT

ENTRYPOINT ["./main"]