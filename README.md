 Getting Started (Local Machine)
 
1. Clone the Repository
bash
git clone https://github.com/Prakharjaisawal/KariniAI-backend.git
cd KariniAI-backend

2. Install Dependencies
bash
npm install

4. Configure .env File
Create a .env file in the root directory and add your environment variables:

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/karini-ai



4. Run the Server
node run dev

backend will be running on http://localhost:5000
