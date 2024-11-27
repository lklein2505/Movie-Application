## Running project locally

1. Using docker-compose:


Start with cloning the repository:
```bash
git clone <repository-url>
```

Navigate to the project directory:
```bash
cd <project-directory>
```

```bash
npm install docker
```

Hit the command:
```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


2. Without using docker-compose:

Start with cloning the repository:
```bash
git clone <repository-url>
```

Navigate to the project directory:
```bash
cd <project-directory>
```

Install dependencies:
```bash
npm install
```

```bash
npm run build
```

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
