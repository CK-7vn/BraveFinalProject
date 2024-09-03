FROM golang:1.22.6
WORKDIR /app 
COPY go.mod go.sum ./ 
RUN go mod download 
COPY . . 
#RUN go mod edit -module server 
CMD ["go", "run", "."]
